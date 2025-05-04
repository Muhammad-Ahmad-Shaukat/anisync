
import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";

function HomePage(){

    

    return<>
    
        <AnimeList/>
        <AnimeSlider type="Trending" limit={10} />
        <AnimeSlider type="top" limit={10} />
        <AnimeSlider type="top_airing" limit={10} />

    
    </>
}

export default HomePage;