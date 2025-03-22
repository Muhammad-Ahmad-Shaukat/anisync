export const anime = async (req , res) => {
    try{
        const {name, id} = req.body;
        if(!name || !id){
            return res.status(400).json({message: "All fields are required"});
        }
        res.status(200).json({ message: "Anime" });
    }catch(error){
        console.error("Anime Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};