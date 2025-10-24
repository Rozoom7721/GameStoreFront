# 🎮 Game Store Web App

A full-stack **web application** for managing a collection of video games.  
Built with **ASP.NET Core (C#)** as the backend REST API and **React + TypeScript** as the frontend.

Users can:
- View a list of games
- Add new games
- Edit existing games
- Delete games
- Filter games by genre (connected to API)

---

## 🚀 Tech Stack

### Backend (API)
- **ASP.NET Core 9 / C#**
- **Entity Framework Core**
- **SqliteS**
- **REST API** architecture
- Endpoints:
  - `GET /games`
  - `POST /games`
  - `PUT /games/{id}`
  - `DELETE /games/{id}`
  - `GET /genres`

### Frontend
- **React 18 + TypeScript**
- **Vite** as a bundler
- **Modern CSS** (custom design)
- Fetches data from the ASP.NET REST API

---

## 🧩 Data Structure

### Game
Example returned from the API:
```json
{
  "id": 2,
  "title": "Sekiro: Shadows Die Twice",
  "genre": "Adventure",
  "price": 59.99,
  "releaseDate": "2019-03-22"
}
