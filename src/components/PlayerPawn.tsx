import React from 'react';
import { Player } from '../types/game';
import { PLAYER_TOKENS } from '../data/boardData';

interface PlayerPawnProps {
  player: Player;
  isCurrentPlayer: boolean;
  size?: 'sm' | 'md' | 'lg';
  index?: number;
}

export const PlayerPawn: React.FC<PlayerPawnProps> = ({
  player,
  isCurrentPlayer,
  size = 'md',
  index = 0
}) => {
  const tokenData = PLAYER_TOKENS.find(t => t.id === player.token) || PLAYER_TOKENS[0];

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs shadow-sm',
    md: 'w-7 h-7 sm:w-8 sm:h-8 text-sm shadow-md',
    lg: 'w-10 h-10 text-lg shadow-lg'
  }[size];

  // Offset pawn position slightly so multiple players on the same tile don't fully overlap
  const offsets = [
    'translate-x-0 translate-y-0',
    'translate-x-1.5 translate-y-1.5',
    '-translate-x-1.5 translate-y-1.5',
    'translate-x-1.5 -translate-y-1.5'
  ];
  const offsetClass = offsets[index % offsets.length];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full font-bold border-2 transition-all duration-300 select-none ${sizeClasses} ${offsetClass} ${
        isCurrentPlayer
          ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-slate-900 scale-110 z-20 animate-bounce'
          : 'z-10'
      }`}
      style={{
        backgroundColor: player.color || tokenData.color,
        borderColor: '#ffffff'
      }}
      title={`${player.name} (${tokenData.emoji})`}
    >
      <span className="drop-shadow-sm filter leading-none pointer-events-none">
        {tokenData.emoji}
      </span>
      {player.inJail && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-[9px] px-1 rounded-full text-white font-bold ring-1 ring-white">
          🔒
        </span>
      )}
    </div>
  );
};
