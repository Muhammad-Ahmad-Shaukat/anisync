import AnimeCard from "../../components/AnimeCard/AnimeCard";
import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeCardParent from "../../components/AnimeCard/AnimeCardParent";

function HomePage(){

    

    return<>
    
        <AnimeList/>
        <AnimeCardParent limit={5} categoryId="top" />
        {/* <AnimeCard anime={anime}/> */}
    
    </>
}

export default HomePage;