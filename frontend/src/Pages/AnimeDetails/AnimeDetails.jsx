import { useParams } from "react-router-dom";
import ViewDetails from "../../components/AnimeViewDetails/ViewDetails";

function AnimeDetails() {
  const { animeName } = useParams();
  
  return (
    <>
      <ViewDetails animeName={animeName} />
    </>
  );
}

export default AnimeDetails;
