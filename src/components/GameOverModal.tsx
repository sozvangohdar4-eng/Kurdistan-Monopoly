import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, Language } from '../types/game';
import { calculateNetWorth } from '../utils/gameStorage';
import { PLAYER_TOKENS } from '../data/boardData';
import { soundEngine } from '../utils/soundEngine';

interface GameOverModalProps {
  winner: Player;
  players: Player[];
  language: Language;
  onPlayAgain: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  players,
  language,
  onPlayAgain
}) => {
  useEffect(() => {
    // Launch celebratory confetti
    soundEngine.playSeyranSound();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  const winnerToken = PLAYER_TOKENS.find(t => t.id === winner.token) || PLAYER_TOKENS[0];

  // Sort all players by net worth
  const sortedPlayers = [...players].sort((a, b) => calculateNetWorth(b) - calculateNetWorth(a));

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95">
      <div className="w-full max-w-md bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border-4 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl text-center flex flex-col items-center relative overflow-hidden">
        {/* Crown & Sun */}
        <div className="text-4xl sm:text-5xl animate-bounce mb-1">👑</div>

        <h2 className="text-xl sm:text-2xl font-black text-amber-300">
          {language === 'ku_sorani' ? 'براوەی مەزنی کوردستان!' : language === 'ku_kurmanji' ? 'Serketiya Mezin!' : 'Grand Kurdish Tycoon!'}
        </h2>

        {/* Winner Card */}
        <div className="w-full my-4 p-4 bg-slate-950/80 rounded-2xl border-2 border-amber-400/60 flex items-center justify-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-lg"
            style={{ backgroundColor: winner.color }}
          >
            {winnerToken.emoji}
          </div>
          <div className="text-right">
            <h3 className="text-lg font-black text-white">{winner.name}</h3>
            <p className="text-xs text-amber-400 font-bold font-mono">
              {language === 'ku_sorani' ? 'سامانی گشتی:' : 'Net Worth:'} {calculateNetWorth(winner)} IQD
            </p>
          </div>
        </div>

        {/* Final Standings Leaderboard */}
        <div className="w-full space-y-1.5 my-2 text-xs">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right px-1">
            {language === 'ku_sorani' ? 'ڕیزبەندیی کۆتایی:' : 'Final Standings:'}
          </h4>
          {sortedPlayers.map((p, idx) => {
            const token = PLAYER_TOKENS.find(t => t.id === p.token) || PLAYER_TOKENS[0];
            const netWorth = calculateNetWorth(p);

            return (
              <div
                key={p.id}
                className={`p-2 rounded-xl flex items-center justify-between text-right border ${
                  idx === 0
                    ? 'bg-amber-950/40 border-amber-500/60 font-bold text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500 w-4">#{idx + 1}</span>
                  <span className="text-sm">{token.emoji}</span>
                  <span className="truncate">{p.name}</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span>{p.propertiesOwned.length} 🏠</span>
                  <span className="text-emerald-400 font-bold">{netWorth} IQD</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Play Again Button */}
        <button
          type="button"
          onClick={onPlayAgain}
          className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/30 active:scale-95 transition"
        >
          {language === 'ku_sorani' ? 'دەستپێکردنی یارییەکی نوێ 🔄' : 'Play Again 🔄'}
        </button>
      </div>
    </div>
  );
};
