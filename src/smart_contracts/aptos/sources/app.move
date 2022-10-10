module DDW::DDWApp {
    use std::error;
    use std::signer;
    use std::string;
    use std::vector;
    use aptos_std::event::{Self, EventHandle};
    use aptos_framework::account;

//:!:>resource
    struct UserInfo has key {
        ipfsCid: string::String,
    }

    struct LikesInfo has key {
        likedListOnChain: vector<address>,
        likedListOffChain: vector<string::String>,
        superLikedListOnChain: vector<address>,
        superLikedListOffChain: vector<string::String>,
        matchedListOnChain: vector<address>,
        matchedListOffChain: vector<string::String>,
    }

    struct LastMatchEvent has key {
        match_event: EventHandle<MatchEvent>,
    }

    struct LastPrivateSpaceCreateEvent has key {
        private_space_creation_event: EventHandle<PrivateSpaceCreationEvent>
    }
//<:!:resource

    struct MatchEvent has drop, store {
        matched_with_on_chain: address,
        matched_with_off_chain: string::String,
    }

    struct PrivateSpaceCreationEvent has drop, store {
        private_space_with_on_chain: address,
        private_space_with_off_chain: string::String,
        time_duration_mins: u64,
    }

    //rate constants
    const APPROVAL_TO_COIN_XR_RATE: u64 = 1000000000;
    const COINS_PER_MINUTE_OF_PRIVATE_SPACE: u64 = 6000000000;

    // Error Codes
    const EACCOUNT_ALREADY_REGISTERED: u64 = 0;
    const ENO_USER_INFO: u64 = 1;
    const ENO_LIKES_INFO: u64 = 2;
    const ELIKED_ALREADY: u64 = 3;
    const ESUPER_LIKED_ALREADY: u64 = 4;
    const ENOT_OWNER: u64 = 5;

    public fun is_account_registered(account_addr: address): bool {
        exists<UserInfo>(account_addr)
    }

    public entry fun register<CoinType>(account: &signer, ipfs_cid: string::String) {
        let account_addr = signer::address_of(account);
        assert!(
            !is_account_registered(account_addr),
            error::already_exists(EACCOUNT_ALREADY_REGISTERED),
        );

        DDW::DDWcoin::register<CoinType>(account);
        DDW::DDWapproval::register<CoinType>(account);
        let user_info = UserInfo {
            ipfsCid: ipfs_cid
        };
        move_to(account, user_info);
        DDW::DDWcoin::mint<CoinType>(account_addr, 30000000000);
    }

    public fun ddw_coin_mint<CoinType>(account: &signer, amount: u64) {
        let account_addr = signer::address_of(account);
        assert!(account_addr == @DDW, error::permission_denied(ENOT_OWNER));
        assert!(
            !is_account_registered(account_addr),
            error::already_exists(EACCOUNT_ALREADY_REGISTERED),
        );
        DDW::DDWcoin::mint<CoinType>(account_addr, amount);
    }

    public fun get_user_details(addr: address): string::String acquires UserInfo {
        assert!(exists<UserInfo>(addr), error::not_found(ENO_USER_INFO));
        *&borrow_global<UserInfo>(addr).ipfsCid
    }

    // Returns if Matched or not
    public fun like_on_chain<CoinType>(account: &signer, to: address): bool acquires LikesInfo, LastMatchEvent {
        let account_addr = signer::address_of(account);
        assert!(exists<UserInfo>(account_addr), error::not_found(ENO_USER_INFO));
        if(exists<LikesInfo>(account_addr)) {
            let likes_account = *&borrow_global<LikesInfo>(account_addr).likedListOnChain;
            assert!(!vector::contains(&likes_account, &account_addr),  error::already_exists(ELIKED_ALREADY));
            let likes_info = borrow_global_mut<LikesInfo>(account_addr);
            let likes_vector = *&likes_info.likedListOnChain;
            vector::push_back(&mut likes_vector, to);
        }
        else {
            let likes_info = LikesInfo {
                likedListOnChain: vector::singleton<address>(to),
                likedListOffChain: vector::empty<string::String>(),
                superLikedListOnChain: vector::empty<address>(),
                superLikedListOffChain: vector::empty<string::String>(),
                matchedListOnChain: vector::empty<address>(),
                matchedListOffChain: vector::empty<string::String>(),
            };
            move_to(account, likes_info);
        };
        DDW::DDWapproval::mint<CoinType>(to, 1);
        if(exists<LikesInfo>(to)) {
            let likes = *&borrow_global<LikesInfo>(to).likedListOnChain;
            let super_likes = *&borrow_global<LikesInfo>(to).superLikedListOnChain;
            let is_liked = vector::contains(&likes, &account_addr);
            let is_super_liked = vector::contains(&super_likes, &account_addr);
            if(is_liked || is_super_liked) {
                let likes_info = borrow_global_mut<LikesInfo>(to);
                let matched_vector = *&likes_info.matchedListOnChain;
                vector::push_back(&mut matched_vector, account_addr);
                let matched_likes_info = borrow_global_mut<LikesInfo>(account_addr);
                let second_matched_vector = *&matched_likes_info.matchedListOnChain;
                vector::push_back(&mut second_matched_vector, to);
                if(exists<LastMatchEvent>(account_addr)) {
                    let last_match_event = borrow_global_mut<LastMatchEvent>(account_addr);
                    event::emit_event(&mut last_match_event.match_event, MatchEvent {
                        matched_with_on_chain: to,
                        matched_with_off_chain: string::utf8(b""),
                    });
                }
                else {
                    move_to(account, LastMatchEvent {
                        match_event: account::new_event_handle<MatchEvent>(account),
                    });
                };
                return true
            };
        };
        return false
    }

    // Returns if Matched or not
    public fun super_like_on_chain<CoinType>(account: &signer, to: address): bool acquires LikesInfo, LastMatchEvent {
        let account_addr = signer::address_of(account);
        assert!(exists<UserInfo>(account_addr), error::not_found(ENO_USER_INFO));
        if(exists<LikesInfo>(account_addr)) {
            let likes_account = *&borrow_global<LikesInfo>(to).superLikedListOnChain;
            assert!(!vector::contains(&likes_account, &account_addr),  error::already_exists(ESUPER_LIKED_ALREADY));
            let likes_info = borrow_global_mut<LikesInfo>(account_addr);
            let super_likes_vector = *&likes_info.superLikedListOnChain;
            vector::push_back(&mut super_likes_vector, to);
        }
        else {
            let likes_info = LikesInfo {
                likedListOnChain: vector::empty<address>(),
                likedListOffChain: vector::empty<string::String>(),
                superLikedListOnChain: vector::singleton<address>(to),
                superLikedListOffChain: vector::empty<string::String>(),
                matchedListOnChain: vector::empty<address>(),
                matchedListOffChain: vector::empty<string::String>(),
            };
            move_to(account, likes_info);
        };
        DDW::DDWapproval::mint<CoinType>(to, 3);
        if(exists<LikesInfo>(to)) {
            let likes = *&borrow_global<LikesInfo>(to).likedListOnChain;
            let super_likes = *&borrow_global<LikesInfo>(to).superLikedListOnChain;
            let is_liked = vector::contains(&likes, &account_addr);
            let is_super_liked = vector::contains(&super_likes, &account_addr);
            if(is_liked || is_super_liked) {
                let likes_info = borrow_global_mut<LikesInfo>(to);
                let matched_vector = *&likes_info.matchedListOnChain;
                vector::push_back(&mut matched_vector, account_addr);
                let matched_likes_info = borrow_global_mut<LikesInfo>(account_addr);
                let second_matched_vector = *&matched_likes_info.matchedListOnChain;
                vector::push_back(&mut second_matched_vector, to);
                if(exists<LastMatchEvent>(account_addr)) {
                    let last_match_event = borrow_global_mut<LastMatchEvent>(account_addr);
                    event::emit_event(&mut last_match_event.match_event, MatchEvent {
                        matched_with_on_chain: to,
                        matched_with_off_chain: string::utf8(b""),
                    });
                }
                else {
                    move_to(account, LastMatchEvent {
                        match_event: account::new_event_handle<MatchEvent>(account),
                    });
                };
                return true
            };
        };
        return false
    }

    public fun transfer_ddw_coin_on_chain<CoinType>(
        from: &signer,
        to: address,
        amount: u64,
    ) {
        DDW::DDWcoin::transfer<CoinType>(from, to, amount);
    }

    public fun exchange_approval_and_claim_coin<CoinType>(
        account: &signer,
        amount_of_approval: u64,
    ) {
        DDW::DDWapproval::burn<CoinType>(account, amount_of_approval);
        DDW::DDWcoin::mint<CoinType>(signer::address_of(account), APPROVAL_TO_COIN_XR_RATE*amount_of_approval);
    }

    public fun create_private_space_on_chain<CoinType>(
        account: &signer,
        with: address,
        time_duration_in_minutes: u64,
    ) acquires LastPrivateSpaceCreateEvent {
        DDW::DDWcoin::transfer<CoinType>(account, @DDW, COINS_PER_MINUTE_OF_PRIVATE_SPACE*time_duration_in_minutes);
        let account_addr = signer::address_of(account);
        if(exists<LastPrivateSpaceCreateEvent>(account_addr)) {
                    let last_private_space_create_event = borrow_global_mut<LastPrivateSpaceCreateEvent>(account_addr);
                    event::emit_event(&mut last_private_space_create_event.private_space_creation_event, PrivateSpaceCreationEvent {
                        private_space_with_on_chain: with,
                        private_space_with_off_chain: string::utf8(b""),
                        time_duration_mins: time_duration_in_minutes,
                    });
                }
                else {
                    move_to(account, LastPrivateSpaceCreateEvent {
                        private_space_creation_event: account::new_event_handle<PrivateSpaceCreationEvent>(account),
                    });
                };
    }

    public fun get_matches(account: &signer): (vector<address>, vector<string::String>)acquires LikesInfo {
        assert!(exists<LikesInfo>(signer::address_of(account)), error::not_found(ENO_LIKES_INFO));
        let likes_info = borrow_global<LikesInfo>(signer::address_of(account));
        (*&likes_info.likedListOnChain, *&likes_info.likedListOffChain)
    }
}
