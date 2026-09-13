import React from 'react';
import { Player, BoardTile, Language, GameState } from '../types/game';

interface ActionControlsProps {
  state: GameState;
  currentPlayer: Player;
  currentTile: BoardTile;
  language: Language;
  onRollDice: () => void;
  onEndTurn: () => void;
  onBuyProperty: () => void;
  onStartAuction: () => void;
  onPayBail: () => void;
  onUseJailCard: () => void;
  onDeclareBankruptcy: () => void;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  state,
  currentPlayer,
  currentTile,
  language,
  onRollDice,
  onEndTurn,
  onBuyProperty,
  onStartAuction,
  onPayBail,
  onUseJailCard,
  onDeclareBankruptcy
}) => {
  const isAI = currentPlayer.isAI;
  const isDoubleRoll = state.dice[0] === state.dice[1] && state.hasRolled;

  // Check if current tile is an unowned property and player just landed here
  const tileOwner = state.players.find(p => p.propertiesOwned.includes(currentTile.id));
  const isBuyable =
    !tileOwner &&
    (currentTile.type === 'property' || currentTile.type === 'railroad' || currentTile.type === 'utility') &&
    state.hasRolled &&
    state.phase === 'tile_action';

  const canAffordBuy = isBuyable && currentTile.price && currentPlayer.money >= currentTile.price;

  if (isAI) {
    return (
      <div className="w-full bg-slate-900/90 border-t border-amber-500/20 p-2 sm:p-3 flex items-center justify-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        <span className="text-xs sm:text-sm font-bold text-amber-300">
          {language === 'ku_sorani' ? `${currentPlayer.name} بڕیار دەدات...` : `${currentPlayer.name} is making a move...`}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/95 border-t border-slate-800 p-2 sm:p-3 backdrop-blur-md flex flex-col gap-2 max-w-lg mx-auto">
      {/* Jail Options */}
      {currentPlayer.inJail && !state.hasRolled && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-red-950/50 border border-red-500/40 rounded-xl items-center justify-between">
          <span className="text-[11px] font-bold text-red-300">
            🔒 {language === 'ku_sorani' ? 'لە زینداندایت!' : 'In Jail!'}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={currentPlayer.money < 50}
              onClick={onPayBail}
              className="py-1 px-2.5 bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-[10px] sm:text-xs font-bold transition"
            >
              {language === 'ku_sorani' ? 'پێدانی سزای ٥٠ دینار' : 'Pay 50 IQD Bail'}
            </button>
            {currentPlayer.hasGetOutOfJailCard > 0 && (
              <button
                type="button"
                onClick={onUseJailCard}
                className="py-1 px-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-[10px] sm:text-xs font-bold transition"
              >
                {language === 'ku_sorani' ? 'کارتی لێخۆشبوون' : 'Use Jail Card'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Action Buttons Bar */}
      <div className="flex items-center gap-2">
        {/* Roll Dice Button (if not rolled yet or has double) */}
        {(!state.hasRolled || isDoubleRoll) && (
          <button
            type="button"
            disabled={state.isRolling}
            onClick={onRollDice}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            {state.isRolling
              ? (language === 'ku_sorani' ? 'دەخولێتەوە...' : 'Rolling...')
              : isDoubleRoll
              ? (language === 'ku_sorani' ? 'دووانە! زار بهاوێژەوە 🎲' : 'Doubles! Roll Again 🎲')
              : (language === 'ku_sorani' ? 'زار بهاوێژە 🎲' : 'Roll Dice 🎲')}
          </button>
        )}

        {/* Buy Property Button */}
        {isBuyable && (
          <>
            <button
              type="button"
              disabled={!canAffordBuy}
              onClick={onBuyProperty}
              className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg active:scale-95 transition flex items-center justify-center gap-1"
            >
              <span>{language === 'ku_sorani' ? 'کڕینی ئەم موڵکە' : 'Buy Property'}</span>
              <span className="font-mono">({currentTile.price} IQD)</span>
            </button>

            <button
              type="button"
              onClick={onStartAuction}
              className="py-2.5 px-3 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl transition"
              title="موزایەدەی ئاشکرا"
            >
              🏷️ {language === 'ku_sorani' ? 'موزایەدە' : 'Auction'}
            </button>
          </>
        )}

        {/* End Turn Button */}
        {state.hasRolled && !isDoubleRoll && (
          <button
            type="button"
            onClick={onEndTurn}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-100 font-black text-xs sm:text-sm rounded-xl border border-slate-600 shadow-md active:scale-95 transition"
          >
            {language === 'ku_sorani' ? 'کۆتایی سەرە ⏭️' : language === 'ku_kurmanji' ? 'Dor Bi Dawî Bû' : 'End Turn ⏭️'}
          </button>
        )}

        {/* Bankruptcy Trigger if negative money */}
        {currentPlayer.money < 0 && (
          <button
            type="button"
            onClick={onDeclareBankruptcy}
            className="py-2.5 px-3 bg-red-700 hover:bg-red-600 text-white font-black text-xs rounded-xl shadow-lg animate-pulse transition"
          >
            {language === 'ku_sorani' ? 'ئیفلاس 💀' : 'Bankrupt 💀'}
          </button>
        )}
      </div>
    </div>
  );
};
