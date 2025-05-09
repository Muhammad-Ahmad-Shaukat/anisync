import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AdminAnimeList from "../AdminPage/AdminAnimeList";


function HomePage(){

    // const animeName = "Jujutsu Kaisen";

    return<>
    
    <AdvancedSearch/>
        <AnimeList/>
        <AnimeSlider type="Trending" limit={11} />
        <AnimeSlider type="top" limit={11} />
        <AnimeSlider type="airing" limit={11} />
    {/* <AdminAnimeList/> */}
    </>
}

export default HomePage;