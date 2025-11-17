# AniSync

AniSync is a full-stack anime streaming platform built with a modern, scalable architecture. It integrates a **React** frontend, a **Node.js + Express** backend, and a dedicated **Python AI microservice** to deliver intelligent search, recommendations, and enhanced user experience. The platform streams content via **AWS S3** and leverages **third‑party anime APIs** for metadata and catalog retrieval.

---

## 🚀 Features

### **Frontend (React)**

* Modern, responsive UI for anime browsing and streaming
* Search, filtering, and category-based navigation
* Player interface for smooth playback
* User-focused interactions and seamless routing

### **Backend (Node.js + Express)**

* REST API for handling anime data, user requests, and streaming endpoints
* Integration with third‑party anime APIs for catalog and metadata
* AWS S3 streaming implementation
* Secure routing, middleware, and scalable architecture

### **AI Microservice (Python)**

* NLP-powered search enhancement
* Recommendation capabilities
* Runs as a separate server communicating with backend
* Designed for extensibility and future AI features

---

## 🏗️ Architecture Overview

```
React Frontend  <-->  Node.js + Express Backend  <-->  AI Python Server
                                   |
                                   v
                                 AWS S3
                                   |
                           3rd Party Anime APIs
```

Each layer is independently deployable, enabling flexibility, scaling, and updates without downtime.

---

## 📦 Tech Stack

### **Frontend**

* React (CRA/Vite depending on project setup)
* Axios / Fetch for API communication
* React Router
* Modern UI libraries (if applicable)

### **Backend**

* Node.js
* Express
* AWS SDK (for S3 operations)
* dotenv for managing environment variables
* Third‑party anime APIs integration

### **AI Server**

* Python 3
* Flask/FastAPI (whichever is used in the project)
* NLP/ML libraries

### **Cloud & External Services**

* AWS S3 (for video storage & streaming)
* External anime metadata APIs

---

## 📁 Project Structure

A general overview (actual structure may vary):

```
AniSync/
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── app.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── main.jsx / index.jsx
│
└── ai-server/
    ├── app.py
    ├── models/
    └── utils/
```

---

## 🛠️ Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/Muhammad-Ahmad-Shaukat/anisync
cd anisync
```

---

## ⚙️ Backend Setup (Node.js)

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret
AWS_BUCKET_NAME=your_bucket
ANIME_API_URL=third_party_api_url
AI_SERVER_URL=http://localhost:8000
```

Run the server:

```bash
npm start
```

---

## 🎨 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 AI Server Setup (Python)

```bash
cd ai-server
pip install -r requirements.txt
python app.py
```

---

## 📡 API Endpoints (Backend)

Common endpoints:

* `GET /anime` – fetch anime list
* `GET /anime/:id` – fetch specific anime
* `GET /stream/:id` – handle streaming through AWS S3
* `POST /ai/search` – forward queries to Python server

---

## 🧪 Future Enhancements

* User authentication and watchlists
* Offline downloads
* Real-time comments/chat
* Improved AI recommendations
* Multi-language subtitle support

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue to discuss what you would like to modify.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you find this project helpful, consider giving it a star on GitHub!
