import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";
import ViewDetails from "../../components/AnimeViewDetails/ViewDetails";
import VideoPlayer from "../../components/VideoSComponent/VideoPlayer";


function HomePage(){

    // const animeName = "Jujutsu Kaisen";

    return<>
    
        {/* <AnimeList/>
        <AnimeSlider type="Trending" limit={10} />
        <AnimeSlider type="top" limit={10} />
        <AnimeSlider type="airing" limit={10} /> */}

        {/* <ViewDetails animeName={animeName} />        */}

        <VideoPlayer/>
    </>
}

export default HomePage;