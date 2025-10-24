// src/components/GameForm.tsx
import { useEffect, useState } from "react";
import type { Game, GameCreateOrUpdate, Genre } from "../Game";
import { getGenres } from "./api";

type GameFormProps = {
  initialGame?: Game;
  onCancelEdit?: () => void;
  onSave: (data: GameCreateOrUpdate, id?: number) => void;
};

export default function GameForm({ initialGame, onSave, onCancelEdit }: GameFormProps) {
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState("");

  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresError, setGenresError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getGenres();
        setGenres(list);
      } catch (err: any) {
        setGenresError(err.message ?? "Błąd ładowania gatunków");
      }
    })();
  }, []);

  useEffect(() => {
    if (initialGame) {
      setTitle(initialGame.title);
      setPrice(initialGame.price);
      setReleaseDate(initialGame.releaseDate);

      const match = genres.find(g => g.name === initialGame.genre);
      setGenreId(match ? match.id : 0);
    } else {
      setTitle("");
      setPrice(0);
      setReleaseDate("");
      setGenreId(0);
    }
  }, [initialGame, genres]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const gameData: GameCreateOrUpdate = {
      title,
      genreId,
      price,
      releaseDate,
    };

    onSave(gameData, initialGame?.id);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-card-title">
        {initialGame ? "Edytuj grę" : "Dodaj nową grę"}
      </h2>

      <div className="form-field">
        <label className="form-label">Tytuł *</label>
        <input
          className="form-input"
          maxLength={50}
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="np. Sekiro: Shadows Die Twice"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Gatunek *</label>

        {genresError && (
          <p className="form-error">
            {genresError} (odśwież stronę)
          </p>
        )}

        <select
          className="form-select"
          required
          value={genreId || ""}
          onChange={e => setGenreId(Number(e.target.value))}
        >
          <option value="" disabled>
            -- wybierz gatunek --
          </option>

          {genres.map(g => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Cena (Price) *</label>
        <input
          className="form-input"
          type="number"
          step="0.01"
          min="0"
          required
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="np. 59.99"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Data wydania *</label>
        <input
          className="form-input"
          type="date"
          required
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialGame ? "Zapisz zmiany" : "Dodaj grę"}
        </button>

        {initialGame && onCancelEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
}
