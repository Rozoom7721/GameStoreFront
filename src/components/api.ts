// src/components/api.ts
import type { Game, GameCreateOrUpdate, Genre } from "../Game";

const GAMES_URL = "http://localhost:5210/games";
const GENRES_URL = "http://localhost:5210/genres";

export async function getGames(): Promise<Game[]> {
  const res = await fetch(GAMES_URL);
  if (!res.ok) throw new Error("Nie udało się pobrać gier");
  return res.json();
}

export async function createGame(game: GameCreateOrUpdate): Promise<Game> {
  const res = await fetch(GAMES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error("Nie udało się dodać gry");
  return res.json();
}

export async function updateGame(id: number, game: GameCreateOrUpdate): Promise<void> {
  const res = await fetch(`${GAMES_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error("Nie udało się zaktualizować gry");
}

export async function deleteGame(id: number): Promise<void> {
  const res = await fetch(`${GAMES_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Nie udało się usunąć gry");
}

export async function getGenres(): Promise<Genre[]> {
  const res = await fetch(GENRES_URL);
  if (!res.ok) throw new Error("Nie udało się pobrać gatunków");
  return res.json();
}
