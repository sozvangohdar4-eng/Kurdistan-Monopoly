import React from 'react';
import { BoardTile, Player, GameState, Language } from '../types/game';
import { BOARD_TILES } from '../data/boardData';
import { TileComponent } from './TileComponent';
import { DiceRoller } from './DiceRoller';

interface BoardProps {
  state: GameState;
  language: Language;
  onTileClick: (tile: BoardTile) => void;
  onRollDice: () => void;
  onOpenTrade: () => void;
  onOpenManage: () => void;
  onOpenSeyranWheel: () => void;
}

export const Board: React.FC<BoardProps> = ({
  state,
  language,
  onTileClick,
  onRollDice,
  onOpenTrade,
  onOpenManage,
  onOpenSeyranWheel
}) => {
  const currentPlayer = state.players[state.currentPlayerIndex];
  const isPlayerTurnAI = currentPlayer?.isAI;

  // Helper to get players on a specific tile
  const getPlayersOnTile = (tileId: number): Player[] => {
    return state.players.filter(p => !p.isBankrupt && p.position === tileId);
  };

  // Helper to find owner of a tile
  const getTileOwner = (tileId: number): Player | undefined => {
    return state.players.find(p => p.propertiesOwned.includes(tileId));
  };

  // 11x11 Grid coordinates mapping for 40 tiles:
  // Tile 0 is Start (Bottom-Right corner: row 11, col 11)
  // Tiles 1..9 are Bottom row (row 11, col 10 down to 2)
  // Tile 10 is Jail (Bottom-Left corner: row 11, col 1)
  // Tiles 11..19 are Left column (col 1, row 10 down to 2)
  // Tile 20 is Seyran / Picnic (Top-Left corner: row 1, col 1)
  // Tiles 21..29 are Top row (row 1, col 2 up to 10)
  // Tile 30 is Go To Jail (Top-Right corner: row 1, col 11)
  // Tiles 31..39 are Right column (col 11, row 2 up to 10)
  const getGridStyle = (tileId: number): React.CSSProperties => {
    let row = 1;
    let col = 1;

    if (tileId === 0) {
      row = 11;
      col = 11;
    } else if (tileId >= 1 && tileId <= 9) {
      row = 11;
      col = 11 - tileId;
    } else if (tileId === 10) {
      row = 11;
      col = 1;
    } else if (tileId >= 11 && tileId <= 19) {
      row = 11 - (tileId - 10);
      col = 1;
    } else if (tileId === 20) {
      row = 1;
      col = 1;
    } else if (tileId >= 21 && tileId <= 29) {
      row = 1;
      col = 1 + (tileId - 20);
    } else if (tileId === 30) {
      row = 1;
      col = 11;
    } else if (tileId >= 31 && tileId <= 39) {
      row = 1 + (tileId - 30);
      col = 11;
    }

    return {
      gridRow: `${row} / span 1`,
      gridColumn: `${col} / span 1`
    };
  };

  const getTileSide = (tileId: number): 'bottom' | 'left' | 'top' | 'right' | 'corner' => {
    if (tileId === 0 || tileId === 10 || tileId === 20 || tileId === 30) return 'corner';
    if (tileId > 0 && tileId < 10) return 'bottom';
    if (tileId > 10 && tileId < 20) return 'left';
    if (tileId > 20 && tileId < 30) return 'top';
    return 'right';
  };

  const isDoubleRoll = state.dice[0] === state.dice[1] && state.hasRolled;

  return (
    <div className="w-full flex flex-col items-center justify-center p-1 sm:p-2 select-none overflow-hidden">
      {/* 11x11 Grid Container */}
      <div
        className="w-full max-w-[620px] aspect-square grid grid-cols-11 grid-rows-11 gap-0.5 sm:gap-1 bg-slate-950 p-1 sm:p-2 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-amber-600/40 shadow-2xl shadow-amber-950/30 relative"
        style={{
          boxShadow: '0 0 35px rgba(217, 119, 6, 0.15)'
        }}
      >
        {/* Render all 40 tiles */}
        {BOARD_TILES.map(tile => {
          const owner = getTileOwner(tile.id);
          const buildings = owner?.buildings[tile.id] || 0;
          const isMortgaged = owner?.mortgaged[tile.id] || false;
          const playersHere = getPlayersOnTile(tile.id);
          const isCurrentTile = currentPlayer?.position === tile.id;

          return (
            <div
              key={tile.id}
              style={getGridStyle(tile.id)}
              className="w-full h-full flex"
            >
              <TileComponent
                tile={tile}
                playersOnTile={playersHere}
                currentPlayerId={currentPlayer?.id || ''}
                owner={owner}
                buildingsCount={buildings}
                isMortgaged={isMortgaged}
                isSelected={state.selectedTileId === tile.id}
                isCurrentPlayerTile={isCurrentTile}
                language={language}
                side={getTileSide(tile.id)}
                onClick={onTileClick}
              />
            </div>
          );
        })}

        {/* Board Center Stage (Row 2-10, Col 2-10) */}
        <div
          className="col-start-2 col-end-11 row-start-2 row-end-11 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-xl sm:rounded-2xl border border-amber-500/20 p-2 sm:p-3 flex flex-col items-center justify-between overflow-hidden relative shadow-inner"
        >
          {/* Decorative Kurdish Sun Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-[140px] sm:text-[220px]">☀️</span>
          </div>

          {/* Center Top: Kurdish Monopoly Header */}
          <div className="w-full flex items-center justify-between gap-1 z-10 border-b border-amber-500/20 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl">☀️</span>
              <div className="text-right">
                <h1 className="text-xs sm:text-base font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                  {language === 'ku_sorani' ? 'مۆنۆپۆلی کوردستان' : language === 'ku_kurmanji' ? 'Monopolya Kurdistanê' : 'Kurdistan Monopoly'}
                </h1>
                <p className="text-[8px] sm:text-[10px] text-amber-200/70 font-medium">
                  {language === 'ku_sorani' ? 'کەلەپوور و بازرگانی' : language === 'ku_kurmanji' ? 'Çand û Bazirganî' : 'Heritage & Empire'}
                </p>
              </div>
            </div>

            {/* Free Parking / Spring Seyran Picnic Pot */}
            <button
              type="button"
              onClick={onOpenSeyranWheel}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-950/90 to-teal-950/90 hover:from-emerald-900 px-2 py-1 rounded-xl border border-emerald-500/40 shadow-sm transition transform active:scale-95"
              title="سەیرانی بەهارە (Seyran Jackpot)"
            >
              <span className="text-sm sm:text-base">🌸</span>
              <div className="text-right">
                <span className="block text-[7px] sm:text-[8px] text-emerald-300/80 font-bold leading-none">
                  {language === 'ku_sorani' ? 'سەیران پۆت' : language === 'ku_kurmanji' ? 'Jackpot' : 'Seyran Pot'}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-emerald-400">
                  {state.jackpot} IQD
                </span>
              </div>
            </button>
          </div>

          {/* Center Middle: Active Dice Roller & Current Player Banner */}
          <div className="w-full flex flex-col items-center justify-center my-auto py-1 z-10">
            {currentPlayer && (
              <div className="flex items-center gap-2 mb-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/80 shadow-md">
                <span
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white/50"
                  style={{ backgroundColor: currentPlayer.color }}
                />
                <span className="text-[10px] sm:text-xs font-black text-slate-100">
                  {language === 'ku_sorani' ? `سەرەی: ${currentPlayer.name}` : language === 'ku_kurmanji' ? `Dora: ${currentPlayer.name}` : `Turn: ${currentPlayer.name}`}
                </span>
                {currentPlayer.isAI && (
                  <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold border border-amber-500/40">
                    AI
                  </span>
                )}
              </div>
            )}

            <DiceRoller
              dice={state.dice}
              isRolling={state.isRolling}
              disabled={state.hasRolled && !isDoubleRoll || isPlayerTurnAI || state.phase === 'tile_action' || state.phase === 'auction'}
              onRoll={onRollDice}
              isDouble={isDoubleRoll}
              language={language}
            />
          </div>

          {/* Center Bottom: Quick Empire Action Shortcuts */}
          <div className="w-full flex items-center justify-around gap-1 sm:gap-2 z-10 pt-1 border-t border-slate-800">
            <button
              type="button"
              onClick={onOpenManage}
              className="flex-1 py-1 sm:py-1.5 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 rounded-lg text-[9px] sm:text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1 transition active:scale-95 shadow"
            >
              <span>📋</span>
              <span>{language === 'ku_sorani' ? 'موڵکەکانم' : language === 'ku_kurmanji' ? 'Malan' : 'Properties'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenTrade}
              className="flex-1 py-1 sm:py-1.5 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 rounded-lg text-[9px] sm:text-xs font-bold border border-teal-500/30 flex items-center justify-center gap-1 transition active:scale-95 shadow"
            >
              <span>🤝</span>
              <span>{language === 'ku_sorani' ? 'مامەڵە' : language === 'ku_kurmanji' ? 'Bazirganî' : 'Trade'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSeyranWheel}
              className="flex-1 py-1 sm:py-1.5 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-pink-300 rounded-lg text-[9px] sm:text-xs font-bold border border-pink-500/30 flex items-center justify-center gap-1 transition active:scale-95 shadow"
            >
              <span>🎡</span>
              <span>{language === 'ku_sorani' ? 'چەرخی سەیران' : language === 'ku_kurmanji' ? 'Çerx' : 'Picnic Wheel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
