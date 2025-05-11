import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/store.js';
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
import Friends from './components/Friends/Friends.jsx';
import WatchTogether from './Pages/watchtogether.jsx/Watchtoether.jsx';
import SelectAnime from './Pages/watchtogether.jsx/selectanime.jsx';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
             <Route
              path="/Friends"
              element={
                
                  <Friends />
              
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/anime/:animeName" element={<AnimeDetails />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/top" element={<TopAiringPage />} />
            <Route path="/watch/:animeName" element={<WatchAnime />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/watchTogether" element={<SelectAnime />} />
                  <Route path="/watchTogether/:animeId" element={<WatchTogether />} />

          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
