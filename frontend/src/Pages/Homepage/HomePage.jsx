/* eslint-disable no-unused-vars */

import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";
import VideoPlayer  from "../../components/VideoSComponent/Video";

function HomePage(){


    return<>
    
        <AnimeList/>
        <AnimeSlider type="Trending" limit={10} />
        <AnimeSlider type="top" limit={10} />
        <AnimeSlider type="airing" limit={10} />
        <VideoPlayer/>


       
    </>
}

export default HomePage;