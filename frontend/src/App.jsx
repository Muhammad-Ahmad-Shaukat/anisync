import React from 'react';
import Signup from './Pages/SignUpPage/Signup';
import Login from './Pages/LoginPage/Login';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
 import AnimeList from './components/AnimeList/AnimeList';

function App() {
  return (
    
    <>
     <BrowserRouter>
      <Navbar/>
      <AnimeList/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;