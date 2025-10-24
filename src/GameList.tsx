import { useEffect, useState } from "react";

type Game = {
  id: number;
  title: string;
  genre: string;
  price: number;
  releaseDate: string;
};

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch("http://localhost:5210/games");
        if (!res.ok) {
          throw new Error("Błąd podczas pobierania gier");
        }
        const data = await res.json();
        setGames(data);
      } catch (err: any) {
        setError(err.message ?? "Nieznany błąd");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Ups: {error}</p>;

  return (
    <div className="games-grid">
      {games.map(game => (
        <div key={game.id} className="game-card">
          <h2>{game.title}</h2>
          <p>Gatunek: {game.genre}</p>
          <p>Cena: {game.price}</p>
          <p>Data wydania: {game.releaseDate}</p>
        </div>
      ))}
    </div>
  );
}
