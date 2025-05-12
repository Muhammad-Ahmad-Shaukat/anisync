/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/store.js';
import axios from 'axios';
import Signup from './Pages/SignUpPage/Signup.jsx';
import Login from './Pages/LoginPage/Login.jsx';
import Navbar from './components/NavBar/Navbar.jsx';
import HomePage from './Pages/Homepage/HomePage.jsx';
import ProfilePage from './Pages/Profilepage/ProfilePage.jsx';
import NotFoundPage from './Pages/ErrrorPages/404Page.jsx';
import ServerCrash from './Pages/ErrrorPages/ServerCrash.jsx';
import Footer from './components/Footer/Footer.jsx';
import AnimeDetails from './Pages/AnimeDetails/AnimeDetails.jsx';
import TrendingPage from './Pages/TrendingPage/TrendingPage.jsx';
import TopAiringPage from './Pages/TopAiringPage/TopAiringPage.jsx';
import WatchAnime from './Pages/VideoStream/watchanime.jsx';
import RedirectIfAuth from './Pages/RedirectIfAuth.jsx';
import WatchTogether from './Pages/watchtogether.jsx/Watchtoether.jsx';
import SelectAnime from './Pages/watchtogether.jsx/selectanime.jsx';
import './App.css';
import NewlyReleasePage from './Pages/NewlyReleasePage/NewlyReleasePage.jsx';

function App() {
  const [serveron, setServerOn] = useState(true);
  const [checked, setChecked] = useState(false);

  const isloogedIn = localStorage.getItem("token") ? true : false;
  
  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/health");
        setServerOn(true);
      } catch (err) {
        setServerOn(false);
      } finally {
        setChecked(true);
      }
    };
    checkServer();
  }, []);
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        {!checked ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : !serveron ? (
          <ServerCrash setServerOn={setServerOn} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/signup"
                element={
                  <RedirectIfAuth>
                    <Signup />
                  </RedirectIfAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectIfAuth>
                    <Login />
                  </RedirectIfAuth>
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/anime/:animeName" element={<AnimeDetails />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/top" element={<TopAiringPage />} />
              <Route path="/new" element={<NewlyReleasePage />} />
              <Route path="/watch/:animeName" element={<WatchAnime />} />
              <Route path="/watchTogether" element={<SelectAnime />} />
              <Route path="/watchTogether/:animeId" element={<WatchTogether />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
