import './App.css';
import Navbar from './component/Navbar'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from './component/Profile';

function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navbar />} />
            <Route exact path="/Profile"   element={<Profile />} />
          </Routes>
        </BrowserRouter>
  
     
    </div>
  );
}

export default App;
