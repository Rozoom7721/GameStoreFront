// src/components/GameList.tsx
import type { Game } from "../Game";

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
};

export default function GameList({ games, onEdit, onDelete }: GameListProps) {
  return (
    <div className="game-grid">
      {games.map(game => (
        <div key={game.id} className="game-card">
          <div>
            <h3 className="game-card-title">{game.title}</h3>

            <p className="game-card-line">
              Gatunek: {game.genre}
            </p>

            <p className="game-card-line">
              Cena: {Number(game.price).toFixed(2)} zł
            </p>

            <p className="game-card-line">
              Premiera: {game.releaseDate}
            </p>
          </div>

          <div className="game-card-footer">
            <button
              className="btn btn-edit"
              onClick={() => onEdit(game)}
            >
              Edytuj
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete(game.id)}
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
