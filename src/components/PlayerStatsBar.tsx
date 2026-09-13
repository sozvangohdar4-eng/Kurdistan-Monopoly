import React from 'react';
import { Player, Language } from '../types/game';
import { calculateNetWorth } from '../utils/gameStorage';
import { PLAYER_TOKENS } from '../data/boardData';

interface PlayerStatsBarProps {
  players: Player[];
  currentPlayerIndex: number;
  language: Language;
  onPlayerClick?: (player: Player) => void;
}

export const PlayerStatsBar: React.FC<PlayerStatsBarProps> = ({
  players,
  currentPlayerIndex,
  language,
  onPlayerClick
}) => {
  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/80 px-2 py-1.5 overflow-x-auto flex items-center gap-2 no-scrollbar">
      {players.map((p, idx) => {
        const isCurrent = idx === currentPlayerIndex && !p.isBankrupt;
        const token = PLAYER_TOKENS.find(t => t.id === p.token) || PLAYER_TOKENS[0];
        const netWorth = calculateNetWorth(p);

        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onPlayerClick?.(p)}
            className={`flex-shrink-0 p-1.5 sm:p-2 rounded-xl border text-right transition-all duration-200 flex items-center gap-2 ${
              p.isBankrupt
                ? 'opacity-40 bg-slate-900 border-slate-800 grayscale'
                : isCurrent
                ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/60 shadow-lg shadow-amber-500/10 scale-102'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
            }`}
          >
            {/* Avatar & Indicator */}
            <div className="relative">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm border-2 border-white/80 shadow"
                style={{ backgroundColor: p.color }}
              >
                {token.emoji}
              </div>
              {p.inJail && (
                <span className="absolute -bottom-1 -right-1 text-[10px]">🔒</span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1">
                <span className="text-[11px] sm:text-xs font-black text-slate-100 truncate max-w-[80px]">
                  {p.name}
                </span>
                {p.isAI && (
                  <span className="text-[7px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded font-bold">
                    AI
                  </span>
                )}
              </div>

              {p.isBankrupt ? (
                <span className="text-[9px] font-bold text-red-400">
                  {language === 'ku_sorani' ? 'ئیفلاس بووە' : 'Bankrupt'}
                </span>
              ) : (
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px]">
                  <span className="font-mono font-bold text-emerald-400">
                    {p.money} IQD
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400 font-medium">
                    {p.propertiesOwned.length} 🏠
                  </span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-amber-300 font-mono hidden sm:inline">
                    💎{netWorth}
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
