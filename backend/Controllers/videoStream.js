

export const videoStream = async(req,res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    try{
        
    }catch{
        return res.status(500).json({message: "Internal Server Error", error: error.message()});
    }
}