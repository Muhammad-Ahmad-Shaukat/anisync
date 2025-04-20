import React from 'react';
import Signup from './SignUpPage/Signup';
import Login from './LoginPage/Login';
import Navbar from './NavBar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Slider from './Homepage/Slider'; 
import Card from './Homepage/AnimeCard'; 


function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <Card/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;