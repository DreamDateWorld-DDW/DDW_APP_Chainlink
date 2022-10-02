import './App.css';
import Navbar from './component/Navbar'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from './component/Profile';
import Userdashboard from './component/Userdashboard';
import Matchprofile from './component/Matchprofile';
import SearchProfile from './component/SearchProfile';


function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navbar />} />
            <Route exact path="/Profile"   element={<Profile />} />
            <Route exact path="/Matchprofile"   element={<Matchprofile />} />
            <Route exact path="/Userdashboard"   element={<Userdashboard />} />
            <Route exact path="/Searchprofile"   element={<SearchProfile />} />


          </Routes>
        </BrowserRouter>
       

     
    </div>
  );
}

export default App;
