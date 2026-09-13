import React, { useState } from 'react';
import { Player, Language, TradeOffer } from '../types/game';
import { BOARD_TILES, GROUP_COLORS } from '../data/boardData';
import { soundEngine } from '../utils/soundEngine';

interface TradeModalProps {
  currentPlayer: Player;
  players: Player[];
  language: Language;
  onProposeTrade: (offer: Omit<TradeOffer, 'id' | 'status'>) => void;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  currentPlayer,
  players,
  language,
  onProposeTrade,
  onClose
}) => {
  const otherPlayers = players.filter(p => p.id !== currentPlayer.id && !p.isBankrupt);

  const [targetPlayerId, setTargetPlayerId] = useState<string>(
    otherPlayers[0]?.id || ''
  );

  const [offeredProperties, setOfferedProperties] = useState<number[]>([]);
  const [requestedProperties, setRequestedProperties] = useState<number[]>([]);
  const [offeredMoney, setOfferedMoney] = useState<number>(0);
  const [requestedMoney, setRequestedMoney] = useState<number>(0);

  const targetPlayer = players.find(p => p.id === targetPlayerId);

  const toggleOffered = (tileId: number) => {
    soundEngine.playClick();
    setOfferedProperties(prev =>
      prev.includes(tileId) ? prev.filter(id => id !== tileId) : [...prev, tileId]
    );
  };

  const toggleRequested = (tileId: number) => {
    soundEngine.playClick();
    setRequestedProperties(prev =>
      prev.includes(tileId) ? prev.filter(id => id !== tileId) : [...prev, tileId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPlayerId) return;

    onProposeTrade({
      senderId: currentPlayer.id,
      receiverId: targetPlayerId,
      offeredMoney,
      offeredProperties,
      requestedMoney,
      requestedProperties
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3 bg-teal-950/80 border-b border-teal-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤝</span>
            <h2 className="text-sm sm:text-base font-black text-teal-300">
              {language === 'ku_sorani' ? 'بازاڕی ئاڵوگۆڕ و مامەڵە' : language === 'ku_kurmanji' ? 'Danûstandin' : 'Trade & Deal Room'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* Target Player Selector */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              {language === 'ku_sorani' ? 'مامەڵە لەگەڵ کێ دەکەیت؟' : 'Trade with which player?'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {otherPlayers.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setTargetPlayerId(p.id);
                    setRequestedProperties([]);
                  }}
                  className={`p-2 rounded-xl border flex items-center gap-2 transition ${
                    targetPlayerId === p.id
                      ? 'bg-teal-950 border-teal-400 text-teal-200 ring-2 ring-teal-400'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="font-bold truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Side by side: Offered vs Requested */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* You Offer */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-amber-300 mb-2 flex items-center justify-between">
                  <span>{language === 'ku_sorani' ? 'ئەوەی پێشکەشی دەکەیت' : 'You Offer'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({currentPlayer.name})</span>
                </h3>

                {/* Property Selection */}
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {currentPlayer.propertiesOwned.length === 0 ? (
                    <p className="text-[11px] text-slate-500 py-2 text-center">
                      {language === 'ku_sorani' ? 'هیچ موڵکێکت نییە' : 'No properties owned'}
                    </p>
                  ) : (
                    currentPlayer.propertiesOwned.map(id => {
                      const tile = BOARD_TILES.find(t => t.id === id);
                      if (!tile) return null;
                      const isSelected = offeredProperties.includes(id);
                      const groupStyle = tile.group ? GROUP_COLORS[tile.group] : null;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleOffered(id)}
                          className={`w-full p-1.5 rounded-lg border text-right flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-amber-950/80 border-amber-400 text-amber-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: groupStyle?.headerBg || '#64748b' }}
                            />
                            <span className="truncate font-bold text-[11px]">
                              {tile.name[language] || tile.name.ku_sorani}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">{tile.price} IQD</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Money offer input */}
              <div className="mt-3 pt-2 border-t border-slate-800">
                <label className="block text-[11px] text-slate-400 mb-1">
                  {language === 'ku_sorani' ? 'پارەی پێشکەشکراو (دینار):' : 'Offered Cash (IQD):'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={currentPlayer.money}
                    step={10}
                    value={offeredMoney}
                    onChange={e => setOfferedMoney(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <span className="font-bold text-amber-400 w-16 text-left font-mono">
                    {offeredMoney} IQD
                  </span>
                </div>
              </div>
            </div>

            {/* You Request */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-teal-300 mb-2 flex items-center justify-between">
                  <span>{language === 'ku_sorani' ? 'ئەوەی داوای دەکەیت' : 'You Request'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({targetPlayer?.name})</span>
                </h3>

                {/* Property Selection */}
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {!targetPlayer || targetPlayer.propertiesOwned.length === 0 ? (
                    <p className="text-[11px] text-slate-500 py-2 text-center">
                      {language === 'ku_sorani' ? 'ئەم یاریزانە موڵکی نییە' : 'No properties owned'}
                    </p>
                  ) : (
                    targetPlayer.propertiesOwned.map(id => {
                      const tile = BOARD_TILES.find(t => t.id === id);
                      if (!tile) return null;
                      const isSelected = requestedProperties.includes(id);
                      const groupStyle = tile.group ? GROUP_COLORS[tile.group] : null;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleRequested(id)}
                          className={`w-full p-1.5 rounded-lg border text-right flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-teal-950/80 border-teal-400 text-teal-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: groupStyle?.headerBg || '#64748b' }}
                            />
                            <span className="truncate font-bold text-[11px]">
                              {tile.name[language] || tile.name.ku_sorani}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">{tile.price} IQD</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Money request input */}
              <div className="mt-3 pt-2 border-t border-slate-800">
                <label className="block text-[11px] text-slate-400 mb-1">
                  {language === 'ku_sorani' ? 'پارەی داواکراو (دینار):' : 'Requested Cash (IQD):'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={targetPlayer?.money || 0}
                    step={10}
                    value={requestedMoney}
                    onChange={e => setRequestedMoney(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                  <span className="font-bold text-teal-400 w-16 text-left font-mono">
                    {requestedMoney} IQD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              disabled={
                offeredProperties.length === 0 &&
                requestedProperties.length === 0 &&
                offeredMoney === 0 &&
                requestedMoney === 0
              }
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 text-slate-950 font-black rounded-xl shadow-lg disabled:opacity-50 active:scale-95 transition"
            >
              {language === 'ku_sorani' ? 'پێشکەشکردنی داواکاری مامەڵە 🤝' : 'Propose Deal 🤝'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition"
            >
              {language === 'ku_sorani' ? 'پاشگەزبوونەوە' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
