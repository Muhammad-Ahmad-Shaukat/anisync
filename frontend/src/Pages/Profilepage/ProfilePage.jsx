import React from "react";
import ProfileBanner from "./Profilebanner";
import EditProfile from "./EditProfile";

const PrfilePage = () => {
    return (
        <><ProfileBanner username="Ahmad" />
<EditProfile
  user={{
    username: "Ahmad",
    email: "ahmadshoukat132@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=ahmad"
  }}
/>




        </>

    );
}

export default PrfilePage;