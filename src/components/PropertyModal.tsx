import React from 'react';
import { BoardTile, Player, Language } from '../types/game';
import { GROUP_COLORS, GROUP_MEMBERS } from '../data/boardData';
import { checkHasMonopoly } from '../utils/gameStorage';

interface PropertyModalProps {
  tile: BoardTile | null;
  players: Player[];
  currentPlayer: Player;
  language: Language;
  onClose: () => void;
  onBuy: (tileId: number) => void;
  onAuction: (tileId: number) => void;
  onBuild: (tileId: number) => void;
  onSellBuilding: (tileId: number) => void;
  onMortgage: (tileId: number) => void;
  onUnmortgage: (tileId: number) => void;
  canBuyHere: boolean;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  tile,
  players,
  currentPlayer,
  language,
  onClose,
  onBuy,
  onAuction,
  onBuild,
  onSellBuilding,
  onMortgage,
  onUnmortgage,
  canBuyHere
}) => {
  if (!tile) return null;

  const owner = players.find(p => p.propertiesOwned.includes(tile.id));
  const isOwner = owner?.id === currentPlayer.id;
  const buildingCount = owner?.buildings[tile.id] || 0;
  const isMortgaged = owner?.mortgaged[tile.id] || false;
  const groupStyle = tile.group ? GROUP_COLORS[tile.group] : null;

  const hasMonopoly = owner && tile.group ? checkHasMonopoly(owner, tile.group) : false;
  const groupTiles = tile.group ? GROUP_MEMBERS[tile.group] || [] : [];
  const groupTilesOwnedByCurrent = currentPlayer.propertiesOwned.filter(id => groupTiles.includes(id)).length;

  const tileName = tile.name[language] || tile.name.ku_sorani;
  const cityName = tile.city ? tile.city[language] || tile.city.ku_sorani : '';
  const description = tile.description ? tile.description[language] || tile.description.ku_sorani : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-slate-900 border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Color Banner */}
        <div
          className="p-3 sm:p-4 text-center relative flex flex-col items-center justify-center shadow-md"
          style={{
            backgroundColor: groupStyle ? groupStyle.headerBg : '#1e293b'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
          {cityName && (
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white/80 bg-black/30 px-2 py-0.5 rounded-full mb-1">
              {cityName}
            </span>
          )}
          <h2 className="text-base sm:text-lg font-black text-white px-4 leading-tight">
            {tileName}
          </h2>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 text-slate-200 text-xs sm:text-sm">
          {/* Landmark Photo Artwork if available */}
          {tile.image && (
            <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden border border-amber-500/30 relative shadow-inner">
              <img
                src={tile.image}
                alt={tileName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Landmark Description Trivia */}
          {description && (
            <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="text-[10px] font-bold text-amber-400 block mb-0.5">
                {language === 'ku_sorani' ? '✨ دەربارەی ئەم شوێنە مێژووییە:' : language === 'ku_kurmanji' ? '✨ Agahî:' : '✨ Historical Trivia:'}
              </span>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {/* Owner & Status Badge */}
          <div className="flex items-center justify-between p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 font-semibold">
              {language === 'ku_sorani' ? 'خاوەندارییەتی:' : language === 'ku_kurmanji' ? 'Xwedî:' : 'Ownership:'}
            </span>
            {owner ? (
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: owner.color }}
                />
                <span className="font-bold text-amber-300">{owner.name}</span>
                {isMortgaged && (
                  <span className="text-[9px] bg-red-900/80 text-red-200 px-1.5 py-0.5 rounded border border-red-700 font-bold">
                    {language === 'ku_sorani' ? 'بارمتە (ڕەهن)' : 'Mortgaged'}
                  </span>
                )}
              </div>
            ) : (
              <span className="font-bold text-emerald-400">
                {language === 'ku_sorani' ? 'ناکڕدراوە (بەردەستە بۆ کڕین)' : language === 'ku_kurmanji' ? 'Bêxwedî ye' : 'Unowned (Available)'}
              </span>
            )}
          </div>

          {/* Property Rent Table (If standard street property) */}
          {tile.type === 'property' && tile.rent && (
            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold border-b border-slate-800 pb-1 text-slate-400">
                <span>{language === 'ku_sorani' ? 'ئاستی کرێ' : 'Rent Tier'}</span>
                <span>{language === 'ku_sorani' ? 'بڕی کرێ' : 'Amount'}</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 0 && !hasMonopoly ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'کرێی ئاسایی' : 'Base Rent'}</span>
                <span>{tile.rent[0]} IQD</span>
              </div>
              <div className={`flex justify-between ${hasMonopoly && buildingCount === 0 ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'کۆمەڵەی تەواو (دوو هێندە)' : 'Full Set (2x)'}</span>
                <span>{(tile.rent[0] || 0) * 2} IQD</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 1 ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'بە ١ خانوو 🏠' : 'With 1 House 🏠'}</span>
                <span>{tile.rent[1]} IQD</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 2 ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'بە ٢ خانوو 🏠🏠' : 'With 2 Houses 🏠🏠'}</span>
                <span>{tile.rent[2]} IQD</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 3 ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'بە ٣ خانوو 🏠🏠🏠' : 'With 3 Houses 🏠🏠🏠'}</span>
                <span>{tile.rent[3]} IQD</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 4 ? 'text-amber-300 font-bold' : ''}`}>
                <span>{language === 'ku_sorani' ? 'بە ٤ خانوو 🏠🏠🏠🏠' : 'With 4 Houses 🏠🏠🏠🏠'}</span>
                <span>{tile.rent[4]} IQD</span>
              </div>
              <div className={`flex justify-between ${buildingCount === 5 ? 'text-yellow-400 font-black' : ''}`}>
                <span>{language === 'ku_sorani' ? 'بە ڤێلا / کۆشک 🏰' : 'With Royal Villa 🏰'}</span>
                <span>{tile.rent[5]} IQD</span>
              </div>
            </div>
          )}

          {/* Financial details: Price, Mortgage, House Cost */}
          {tile.price && (
            <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">{language === 'ku_sorani' ? 'نرخی کڕین' : 'Buy Price'}</span>
                <span className="font-bold text-emerald-400 text-sm">{tile.price} IQD</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">{language === 'ku_sorani' ? 'نرخی بارمتە (ڕەهن)' : 'Mortgage Value'}</span>
                <span className="font-bold text-amber-400 text-sm">{tile.mortgageValue} IQD</span>
              </div>
              {tile.houseCost && (
                <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700 col-span-2">
                  <span className="text-slate-400 block">{language === 'ku_sorani' ? 'تێچووی دروستکردنی هەر خانووێک' : 'House Build Cost'}</span>
                  <span className="font-bold text-blue-400 text-sm">{tile.houseCost} IQD</span>
                </div>
              )}
            </div>
          )}

          {/* Monopoly progress hint */}
          {tile.group && (
            <div className="p-2 bg-slate-800/60 rounded-lg text-[11px] text-slate-300 border border-slate-700 flex items-center justify-between">
              <span>{language === 'ku_sorani' ? 'کۆمەڵەی ئەم ڕەنگە:' : 'Color Set Progress:'}</span>
              <span className="font-bold text-amber-300">
                {groupTilesOwnedByCurrent} / {groupTiles.length}
              </span>
            </div>
          )}
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-2 justify-end">
          {/* If unowned and player is landed on this tile right now */}
          {!owner && canBuyHere && tile.price && (
            <>
              <button
                type="button"
                onClick={() => {
                  onBuy(tile.id);
                  onClose();
                }}
                disabled={currentPlayer.money < tile.price}
                className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl font-black text-xs sm:text-sm shadow-md transition"
              >
                {language === 'ku_sorani' ? `کڕین (${tile.price} دینار)` : `Buy (${tile.price} IQD)`}
              </button>

              <button
                type="button"
                onClick={() => {
                  onAuction(tile.id);
                  onClose();
                }}
                className="py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
              >
                {language === 'ku_sorani' ? 'موزایەدە 🏷️' : 'Auction 🏷️'}
              </button>
            </>
          )}

          {/* If owned by current player */}
          {isOwner && (
            <>
              {hasMonopoly && buildingCount < 5 && tile.houseCost && (
                <button
                  type="button"
                  onClick={() => onBuild(tile.id)}
                  disabled={currentPlayer.money < tile.houseCost || isMortgaged}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition"
                >
                  {buildingCount === 4
                    ? (language === 'ku_sorani' ? 'دروستکردنی کۆشک 🏰' : 'Build Villa 🏰')
                    : (language === 'ku_sorani' ? `خانوو (+${tile.houseCost}) 🏠` : `House (+${tile.houseCost}) 🏠`)}
                </button>
              )}

              {buildingCount > 0 && (
                <button
                  type="button"
                  onClick={() => onSellBuilding(tile.id)}
                  className="py-2 px-3 bg-slate-700 hover:bg-slate-600 text-rose-300 rounded-xl font-bold text-xs transition"
                >
                  {language === 'ku_sorani' ? 'فرۆشتنی خانوو' : 'Sell House'}
                </button>
              )}

              {!isMortgaged && buildingCount === 0 && (
                <button
                  type="button"
                  onClick={() => onMortgage(tile.id)}
                  className="py-2 px-3 bg-amber-800 hover:bg-amber-700 text-amber-200 rounded-xl font-bold text-xs transition"
                >
                  {language === 'ku_sorani' ? `ڕەهن (+${tile.mortgageValue} دینار)` : `Mortgage (+${tile.mortgageValue})`}
                </button>
              )}

              {isMortgaged && (
                <button
                  type="button"
                  onClick={() => onUnmortgage(tile.id)}
                  disabled={currentPlayer.money < Math.round((tile.mortgageValue || 0) * 1.1)}
                  className="py-2 px-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition"
                >
                  {language === 'ku_sorani' ? `دەرهێنان لە ڕەهن (-${Math.round((tile.mortgageValue || 0) * 1.1)})` : 'Unmortgage'}
                </button>
              )}
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs transition"
          >
            {language === 'ku_sorani' ? 'داخستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
