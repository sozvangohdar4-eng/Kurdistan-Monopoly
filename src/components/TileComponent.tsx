import React from 'react';
import { BoardTile, Player, Language } from '../types/game';
import { GROUP_COLORS } from '../data/boardData';
import { PlayerPawn } from './PlayerPawn';

interface TileComponentProps {
  tile: BoardTile;
  playersOnTile: Player[];
  currentPlayerId: string;
  owner?: Player;
  buildingsCount?: number;
  isMortgaged?: boolean;
  isSelected?: boolean;
  isCurrentPlayerTile?: boolean;
  language: Language;
  side: 'bottom' | 'left' | 'top' | 'right' | 'corner';
  onClick: (tile: BoardTile) => void;
}

export const TileComponent: React.FC<TileComponentProps> = ({
  tile,
  playersOnTile,
  currentPlayerId,
  owner,
  buildingsCount = 0,
  isMortgaged = false,
  isSelected = false,
  isCurrentPlayerTile = false,
  language,
  side,
  onClick
}) => {
  const isCorner = tile.type === 'start' || tile.type === 'jail' || tile.type === 'seyran' || tile.type === 'go_to_jail';
  const groupStyle = tile.group ? GROUP_COLORS[tile.group] : null;

  const tileName = tile.name[language] || tile.name.ku_sorani;
  const cityName = tile.city ? tile.city[language] || tile.city.ku_sorani : null;

  return (
    <button
      type="button"
      onClick={() => onClick(tile)}
      className={`relative flex flex-col justify-between select-none transition-all duration-200 outline-none text-right overflow-hidden ${
        isCorner
          ? 'w-full h-full bg-slate-900/95 border border-amber-500/30'
          : 'w-full h-full bg-slate-900/90 border border-slate-700/60 hover:bg-slate-800/90'
      } ${
        isSelected
          ? 'ring-2 ring-yellow-400 ring-inset bg-slate-800 shadow-lg shadow-yellow-500/20 z-10'
          : ''
      } ${
        isCurrentPlayerTile
          ? 'ring-2 ring-emerald-400 ring-inset animate-pulse z-10'
          : ''
      }`}
    >
      {/* Property Color Header */}
      {groupStyle && (
        <div
          className={`w-full py-0.5 sm:py-1 px-1 flex items-center justify-between transition-colors ${
            side === 'top' ? 'order-last' : 'order-first'
          }`}
          style={{ backgroundColor: groupStyle.headerBg }}
        >
          {cityName && (
            <span className="text-[7px] sm:text-[9px] font-bold text-white/90 truncate tracking-tight">
              {cityName}
            </span>
          )}
          {/* Houses / Hotel Display */}
          {buildingsCount > 0 && (
            <div className="flex items-center gap-0.5 bg-black/40 px-1 rounded-sm">
              {buildingsCount === 5 ? (
                <span className="text-[9px] sm:text-xs" title="Royal Villa">🏰</span>
              ) : (
                Array.from({ length: buildingsCount }).map((_, i) => (
                  <span key={i} className="text-[8px] sm:text-[10px]" title="House">🏠</span>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Special Non-Property Header Bar for Utilities / Railroads / Cards */}
      {!groupStyle && !isCorner && (
        <div className={`w-full py-0.5 px-1 bg-slate-800 flex items-center justify-center text-[10px] ${
          side === 'top' ? 'order-last' : 'order-first'
        }`}>
          <span>{tile.icon || (tile.type === 'chance' ? '❓' : tile.type === 'chest' ? '📦' : '🏛️')}</span>
        </div>
      )}

      {/* Center Tile Info */}
      <div className="flex-1 flex flex-col items-center justify-center p-0.5 sm:p-1 text-center w-full min-h-0">
        {isCorner ? (
          <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
            <span className="text-base sm:text-2xl drop-shadow filter">
              {tile.type === 'start' && '🚀'}
              {tile.type === 'jail' && '🔒'}
              {tile.type === 'seyran' && '🌸'}
              {tile.type === 'go_to_jail' && '🚨'}
            </span>
            <span className="text-[8px] sm:text-[11px] font-black text-amber-300 leading-tight">
              {tileName}
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            {tile.icon && !groupStyle && (
              <span className="text-xs sm:text-sm mb-0.5">{tile.icon}</span>
            )}
            <span className="text-[7px] sm:text-[9.5px] font-bold text-slate-100 leading-tight line-clamp-2 px-0.5">
              {tileName}
            </span>
          </div>
        )}

        {/* Price or Rent Tag */}
        {tile.price && (
          <div className="mt-auto pt-0.5 flex items-center justify-center">
            <span className="text-[7px] sm:text-[9px] font-semibold text-emerald-400 bg-emerald-950/70 px-1 py-0.2 rounded border border-emerald-800/40">
              {tile.price} IQD
            </span>
          </div>
        )}

        {tile.taxAmount && (
          <div className="mt-auto pt-0.5">
            <span className="text-[7px] sm:text-[9px] font-semibold text-rose-400 bg-rose-950/70 px-1 py-0.2 rounded border border-rose-800/40">
              {tile.taxAmount} IQD
            </span>
          </div>
        )}
      </div>

      {/* Owner Color Ribbon Indicator */}
      {owner && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 flex items-center justify-center shadow-sm"
          style={{ backgroundColor: owner.color }}
          title={`Owned by ${owner.name}`}
        />
      )}

      {/* Mortgaged Stamp Overlay */}
      {isMortgaged && (
        <div className="absolute inset-0 bg-red-950/80 backdrop-blur-[1px] flex items-center justify-center z-10">
          <span className="text-[8px] sm:text-[10px] font-black text-red-300 transform -rotate-12 border border-red-500 px-1 rounded bg-black/60 shadow">
            ڕەهن / REHN
          </span>
        </div>
      )}

      {/* Players on this tile */}
      {playersOnTile.length > 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-0.5 p-0.5 z-20 flex-wrap">
          {playersOnTile.map((p, idx) => (
            <PlayerPawn
              key={p.id}
              player={p}
              isCurrentPlayer={p.id === currentPlayerId}
              size="sm"
              index={idx}
            />
          ))}
        </div>
      )}
    </button>
  );
};
