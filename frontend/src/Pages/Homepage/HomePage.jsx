import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";


function HomePage(){

    // const animeName = "Jujutsu Kaisen";

    return<>
    
    <AdvancedSearch/>
        <AnimeList/>
        <AnimeSlider type="Trending" limit={10} />
        <AnimeSlider type="top" limit={10} />
        <AnimeSlider type="airing" limit={10} />
    </>
}

export default HomePage;