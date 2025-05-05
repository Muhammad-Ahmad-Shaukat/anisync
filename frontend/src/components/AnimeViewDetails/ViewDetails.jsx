import React from "react";

const ViewDetails = ({ details, onClose }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{details.title}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        {/* Content */}
        <div style={styles.content}>
          <div style={styles.leftColumn}>
            <img
              src={details.posterUrl}
              alt={`${details.title} Poster`}
              style={styles.poster}
            />
          </div>
          <div style={styles.rightColumn}>
            <p style={styles.info}>
              <span style={styles.label}>Rating:</span> {details.rating}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Format:</span> {details.format}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Type:</span> {details.type}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Duration:</span> {details.duration}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Aired:</span> {details.aired}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Premiered:</span> {details.premiered}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Genres:</span> {details.genres.join(", ")}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Studios:</span> {details.studios.join(", ")}
            </p>
            <p style={styles.info}>
              <span style={styles.label}>Producers:</span> {details.producers.join(", ")}
            </p>
            <div style={styles.actions}>
              <button style={styles.actionButton}>Add to List</button>
              <button style={styles.actionButton}>Share</button>
            </div>
            <p style={styles.description}>
               AniSync is the best site to watch Me &amp; Roboco Movie SUB online, or even watch Me &amp; Roboco Movie DUB in HD quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)", // Dark gradient background
    paddingTop: "70px", // Leave room for the navbar that already exists
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#242424",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8)",
    maxWidth: "1000px",
    width: "90%",
    color: "#e0e0e0",
    marginBottom: "40px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #444",
    paddingBottom: "15px",
    marginBottom: "25px",
  },
  title: {
    fontSize: "24px",
    margin: 0,
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "28px",
    color: "#e0e0e0",
    cursor: "pointer",
    lineHeight: "1",
    transition: "color 0.3s ease",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
  },
  leftColumn: {
    flex: "1 1 300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
  },
  rightColumn: {
    flex: "2 1 300px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  info: {
    margin: "8px 0",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
    marginRight: "8px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  },
  actionButton: {
    padding: "10px 20px",
    backgroundColor: "#3f51b5",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  description: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#ccc",
  },
};

export default ViewDetails;
