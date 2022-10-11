export const getAptosWallet = () => {
  return "aptos" in window;
};

export const isWalletConnected = async () => {
  try {
    if (await window.aptos?.isConnected?.()) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const isAccountCreated = async () => {
  try {
    const res = await window.aptos?.isConnected?.();
    // if there is an account we are getting a true/false response else we are getting an object type response
    return typeof res === "boolean";
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const connectToWallet = async () => {
  try {
    const result = await window.aptos?.connect?.();
    if ("address" in result) return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getAccountAddress = async () => {
  try {
    const data = await window.aptos?.account?.();
    if ("address" in data) return data.address;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getWalletNetwork = async () => {
  try {
    return await window.aptos?.network?.();
  } catch (error) {
    console.log(error);
  }
  return "Devnet"; // default wallet network
};

export const isUpdatedVersion = () =>
  window.aptos?.on instanceof Function;

export const signAndSubmitTransaction = async (
  transactionPayload,
  client,
) => {
  const responseOnError = {
    transactionSubmitted: false,
    message: "Unknown Error",
  };
  try {
    const response = await window.aptos?.signAndSubmitTransaction?.(
      transactionPayload,
    );
    // transaction succeed
    if ("hash" in response) {
      await client.waitForTransaction(response["hash"]);
      return {
        transactionSubmitted: true,
        transactionHash: response["hash"],
      };
    }
    // transaction failed
    return {...responseOnError, message: response.message};
  } catch (error) {
    if (typeof error == "object" && "message" in error) {
      responseOnError.message = error.message;
    }
  }
  return responseOnError;
};
