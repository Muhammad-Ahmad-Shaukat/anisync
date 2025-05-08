import React, { useEffect, useState } from "react";
import ProfileBanner from "./ProfileBanner";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err.message);
        alert("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <ProfileBanner username={user.username} />
      <EditProfile
        user={{
          username: user.username,
          email: user.email,
          avatarUrl: user.profilePic,
        }}
      />
    </>
  );
};

export default ProfilePage;
