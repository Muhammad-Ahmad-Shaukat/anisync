
import AnimeList from "../../components/AnimeList/AnimeList";
import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";

function HomePage(){

    

    return<>
    
        <AnimeList/>
        <AnimeSlider type="Trending" limit={10} />
        <AnimeSlider type="Top" limit={10} airing= {true}/>
      
    
    </>
}

export default HomePage;