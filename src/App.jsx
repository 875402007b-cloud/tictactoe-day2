
import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const winner = getWinner();
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-4">

      <div className="game-card w-full max-w-md rounded-3xl p-6 sm:p-8 text-center">

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
          Tic <span className="text-purple-400">Tac</span> Toe
        </h1>

        <p className="text-gray-400 mb-8">
          Challenge your friend and win!
        </p>

        {/* Player Information */}
        <div className="flex justify-between gap-4 mb-6">

          <div className={`player-card ${isXTurn && !winner && !isDraw ? "active-x" : ""}`}>
            <span className="text-gray-300 text-sm">Player 1</span>
            <p className="text-3xl font-bold text-cyan-400">X</p>
          </div>

          <div className={`player-card ${!isXTurn && !winner && !isDraw ? "active-o" : ""}`}>
            <span className="text-gray-300 text-sm">Player 2</span>
            <p className="text-3xl font-bold text-pink-400">O</p>
          </div>

        </div>

        {/* Game Status */}
        <div className="mb-6 rounded-xl bg-white/10 p-4">
          {winner ? (
            <p className="text-xl font-bold text-green-400">
              🎉 Player {winner === "X" ? "1 (X)" : "2 (O)"} Wins!
            </p>
          ) : isDraw ? (
            <p className="text-xl font-bold text-yellow-400">
              🤝 It's a Draw!
            </p>
          ) : (
            <p className="text-lg text-white">
              Player {isXTurn ? "1 (X)" : "2 (O)"}'s Turn
            </p>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3">

          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner || isDraw}
              className={`game-cell aspect-square rounded-2xl text-5xl sm:text-6xl font-extrabold
                ${cell === "X" ? "text-cyan-400" : "text-pink-400"}
                ${!cell && !winner && !isDraw ? "hover:bg-purple-500/30 cursor-pointer" : ""}
              `}
            >
              {cell}
            </button>
          ))}

        </div>

        {/* Restart Button */}
        <button
          onClick={resetGame}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:from-purple-500 hover:to-indigo-500"
        >
          ↻ Restart Game
        </button>

        <p className="text-gray-500 text-sm mt-6">
          Made with ❤️ using React & Tailwind CSS
        </p>

      </div>
    </div>
  );
}

export default App;
