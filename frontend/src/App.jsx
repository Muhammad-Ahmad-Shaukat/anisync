// import React, { useEffect, useState } from 'react';
import React from 'react';
//import axios from 'axios';
import Signup from './Pages/SignUpPage/Signup';
import Login from './Pages/LoginPage/Login';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Homepage/HomePage';
import ProfilePage from './Pages/Profilepage/ProfilePage';
import NotFoundPage from "./Pages/ErrrorPages/404Page.jsx";
import ServerCrash from './Pages/ErrrorPages/ServerCrash.jsx';
import Footer from './components/Footer/Footer';

 function App() {
//   const [serveron, setServerOn] = useState(true);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const checkServer = async () => {
//       try {
//         await axios.get("http://localhost:5000/api/auth/health");
//         setServerOn(true);
//       } catch (err) {
//         setServerOn(false);
//       } finally {
//         setChecked(true);
//       }
//     };
//     checkServer();
//   }, []);

  return (
    <BrowserRouter>
      {/* {!checked ? (
        <div className="loading">Checking server...</div>
      ) : !serveron ? (
        <ServerCrash setServerOn={setServerOn} />
      ) : ( */}
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </>
      {/* )} */}
    </BrowserRouter>
  );
}

export default App;
