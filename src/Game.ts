// src/Game.ts
export interface Genre {
  id: number;
  name: string;
}

// GET /games
export interface Game {
  id: number;
  title: string;
  genre: string;
  price: number;
  releaseDate: string;  // "YYYY-MM-DD"
}

//POST / PUT / PATCH
export interface GameCreateOrUpdate {
  title: string;
  genreId: number;
  price: number;
  releaseDate: string;  // "YYYY-MM-DD"
}
