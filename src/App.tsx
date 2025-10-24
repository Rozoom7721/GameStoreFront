// src/App.tsx
import { useEffect, useState } from "react";
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from "./components/api";
import type { Game, GameCreateOrUpdate } from "./Game";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";

import "./App.css"; // <-- ważne

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [gameBeingEdited, setGameBeingEdited] = useState<Game | undefined>(
    undefined
  );

  // Ładowanie listy gier
  useEffect(() => {
    (async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (err: any) {
        setError(err.message ?? "Błąd ładowania");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSave(gameData: GameCreateOrUpdate, id?: number) {
    try {
      if (id == null) {
        // Nowa gra (POST)
        const newGame = await createGame(gameData);
        setGames(old => [...old, newGame]);
      } else {
        // Edycja (PUT)
        await updateGame(id, gameData);
        setGames(old =>
          old.map(g =>
            g.id === id
              ? { ...g, ...g, ...{ 
                  title: gameData.title,
                  price: gameData.price,
                  releaseDate: gameData.releaseDate,
                  // UWAGA: po PUT backend może nie zmienić nazwy gatunku od razu w pamięci frontu
                  // tu nic nie wiemy o genre (string), bo wysyłaliśmy genreId,
                  // więc zostawiamy stare g.genre
                } }
              : g
          )
        );
      }
      setGameBeingEdited(undefined);
    } catch (err: any) {
      alert(err.message ?? "Błąd zapisu");
    }
  }

  async function handleDelete(id: number) {
    const sure = window.confirm("Na pewno usunąć tę grę?");
    if (!sure) return;

    try {
      await deleteGame(id);
      setGames(old => old.filter(g => g.id !== id));
    } catch (err: any) {
      alert(err.message ?? "Błąd usuwania");
    }
  }

  function handleEditStart(game: Game) {
    setGameBeingEdited(game);
  }

  function handleCancelEdit() {
    setGameBeingEdited(undefined);
  }

  if (loading) {
    return (
      <div className="page">
        <div className="state-box">Ładowanie...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="state-box state-error">Błąd: {error}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header-title">Biblioteka gier</h1>
        <p className="page-header-desc">
          Dodawaj, edytuj i usuwaj gry z bazy.
        </p>
      </header>

      <main className="layout">
        <section className="layout-left">
          <h2 className="section-title">Lista</h2>
          {games.length === 0 ? (
            <p className="empty-state">Brak gier 🙃</p>
          ) : (
            <GameList
              games={games}
              onEdit={handleEditStart}
              onDelete={handleDelete}
            />
          )}
        </section>

        <aside className="layout-right">
          <GameForm
            initialGame={gameBeingEdited}
            onSave={handleSave}
            onCancelEdit={handleCancelEdit}
          />
        </aside>
      </main>
    </div>
  );
}
