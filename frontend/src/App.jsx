import React from 'react';
import Signup from './SignUpPage/Signup';
import Login from './LoginPage/Login';
import Navbar from './NavBar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Anime from './Anime';
import Header from './Header';

function App() {
  return (
    <>
    
    
    <Navbar/>
    {/* <Header /> */}
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/header' element={<Header />} />
        <Route path="/x" element={<Anime />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;