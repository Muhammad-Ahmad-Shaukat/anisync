import React, { useState } from "react";
import "./AnimeEditPage.css";

const dummyAnime = {
  _id: "1",
  name: "Naruto",
  image: "https://posterwa.com/cdn/shop/files/NARUTO37_682fec30-603c-466e-9c5d-0033ee55d9b0.jpg?v=1691434731",
  description: "A young ninja who seeks recognition from his peers and dreams of becoming the Hokage.",
  genre: "Action, Adventure",
  year: 2002,
};

const dummyEpisodes = [
  {
    _id: "e1",
    animeId: "1",
    episode_number: 1,
    episode_title: "Enter: Naruto Uzumaki!",
    video_src: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4",
    episode_pic_src: "https://static.wikia.nocookie.net/naruto/images/4/4d/Episode_1.png",
  },
  {
    _id: "e2",
    animeId: "1",
    episode_number: 2,
    episode_title: "My Name is Konohamaru!",
    video_src: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4",
    episode_pic_src: "https://static.wikia.nocookie.net/naruto/images/6/6c/Episode_2.png",
  },
];

const AnimeEditPage = () => {
  const [anime, setAnime] = useState(dummyAnime);
  const [episodes, setEpisodes] = useState(dummyEpisodes);
  const [newEpisode, setNewEpisode] = useState({
    episode_number: "",
    episode_title: "",
    video_src: "",
    episode_pic_src: "",
  });

  const handleAnimeChange = (e) => {
    setAnime({ ...anime, [e.target.name]: e.target.value });
  };

  const handleEpisodeChange = (index, e) => {
    const updated = [...episodes];
    updated[index][e.target.name] = e.target.value;
    setEpisodes(updated);
  };

  const handleNewEpisodeChange = (e) => {
    setNewEpisode({ ...newEpisode, [e.target.name]: e.target.value });
  };

  const handleAddEpisode = (e) => {
    e.preventDefault();
    if (!newEpisode.episode_number || !newEpisode.episode_title) return;
    setEpisodes([
      ...episodes,
      {
        ...newEpisode,
        _id: Date.now().toString(),
        animeId: anime._id,
        video_src: newEpisode.video_src || "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4",
      },
    ]);
    setNewEpisode({
      episode_number: "",
      episode_title: "",
      video_src: "",
      episode_pic_src: "",
    });
  };

  const handleDeleteEpisode = (id) => {
    setEpisodes(episodes.filter((ep) => ep._id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Anime and episodes saved (dummy action)!");
  };

  return (
    <div className="edit-anime-container">
      <h1>Edit Anime</h1>
      <form className="anime-form" onSubmit={handleSave}>
        <div className="anime-fields">
          <div className="anime-image-section">
            <img src={anime.image} alt={anime.name} className="edit-anime-poster" />
            <input
              type="text"
              name="image"
              value={anime.image}
              onChange={handleAnimeChange}
              placeholder="Anime Image URL"
              className="input"
            />
          </div>
          <div className="anime-info-section">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={anime.name}
                onChange={handleAnimeChange}
                className="input"
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={anime.description}
                onChange={handleAnimeChange}
                className="input"
                rows={3}
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={anime.genre}
                onChange={handleAnimeChange}
                className="input"
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                name="year"
                value={anime.year}
                onChange={handleAnimeChange}
                className="input"
              />
            </label>
          </div>
        </div>
        <button className="save-btn" type="submit">Save Anime</button>
      </form>

      <h2>Episodes</h2>
      <div className="episodes-list">
        {episodes.length === 0 && <div className="no-episodes">No episodes yet.</div>}
        {episodes.map((ep, idx) => (
          <div key={ep._id} className="episode-card">
            <div className="episode-pic-section">
              <img
                src={ep.episode_pic_src || "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4"}
                alt={ep.episode_title}
                className="episode-pic"
              />
            </div>
            <div className="episode-info-section">
              <label>
                Episode #
                <input
                  type="number"
                  name="episode_number"
                  value={ep.episode_number}
                  onChange={(e) => handleEpisodeChange(idx, e)}
                  className="input"
                  min="1"
                />
              </label>
              <label>
                Title
                <input
                  type="text"
                  name="episode_title"
                  value={ep.episode_title}
                  onChange={(e) => handleEpisodeChange(idx, e)}
                  className="input"
                />
              </label>
              <label>
                Video URL
                <input
                  type="text"
                  name="video_src"
                  value={ep.video_src}
                  onChange={(e) => handleEpisodeChange(idx, e)}
                  className="input"
                />
              </label>
              <label>
                Picture URL
                <input
                  type="text"
                  name="episode_pic_src"
                  value={ep.episode_pic_src || ""}
                  onChange={(e) => handleEpisodeChange(idx, e)}
                  className="input"
                />
              </label>
            </div>
            <button className="delete-ep-btn" onClick={() => handleDeleteEpisode(ep._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h3>Add New Episode</h3>
      <form className="add-episode-form" onSubmit={handleAddEpisode}>
        <input
          type="number"
          name="episode_number"
          placeholder="Episode #"
          value={newEpisode.episode_number}
          onChange={handleNewEpisodeChange}
          className="input"
          min="1"
          required
        />
        <input
          type="text"
          name="episode_title"
          placeholder="Title"
          value={newEpisode.episode_title}
          onChange={handleNewEpisodeChange}
          className="input"
          required
        />
        <input
          type="text"
          name="video_src"
          placeholder="Video URL"
          value={newEpisode.video_src}
          onChange={handleNewEpisodeChange}
          className="input"
        />
        <input
          type="text"
          name="episode_pic_src"
          placeholder="Picture URL"
          value={newEpisode.episode_pic_src}
          onChange={handleNewEpisodeChange}
          className="input"
        />
        <button className="add-ep-btn" type="submit">Add Episode</button>
      </form>
    </div>
  );
};

export default AnimeEditPage;
