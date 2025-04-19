import React from 'react';
import Signup from './SignUpPage/Signup';
import Login from './LoginPage/Login';
import Navbar from './NavBar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import VideoStream from './Vediostream'; 

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <VideoStream apiUrl="http://localhost:8000/video" />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;