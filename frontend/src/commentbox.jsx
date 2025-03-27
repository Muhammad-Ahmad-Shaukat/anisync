import React from "react";

const commentbox = (user_id, comment) =>{
    return(
        <>
            <h6>{user_id}</h6>
            <p>{comment}</p>
        </>
    )
};

export default commentbox;