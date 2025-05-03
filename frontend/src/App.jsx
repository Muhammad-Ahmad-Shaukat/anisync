import React from 'react';
import Signup from './Pages/SignUpPage/Signup';
import Login from './Pages/LoginPage/Login';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AnimeList from './components/AnimeList/AnimeList';
import VideoPlayer from './components/VideoSComponent/Video';
import { dummyComments } from './components/comments/dummy';
import CommentSection from './components/comments/CommentsSection';
import HomePage from './Pages/Homepage/HomePage';
function App() {
  return (
    
    <>
     <BrowserRouter>
     
      <Navbar/>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;