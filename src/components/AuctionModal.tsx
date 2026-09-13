import React from 'react';
import { AuctionState, Player, Language } from '../types/game';
import { BOARD_TILES, GROUP_COLORS } from '../data/boardData';
import { soundEngine } from '../utils/soundEngine';

interface AuctionModalProps {
  auction: AuctionState;
  players: Player[];
  language: Language;
  onBid: (amount: number) => void;
  onPass: () => void;
}

export const AuctionModal: React.FC<AuctionModalProps> = ({
  auction,
  players,
  language,
  onBid,
  onPass
}) => {
  const tile = BOARD_TILES.find(t => t.id === auction.tileId);
  const highestBidder = players.find(p => p.id === auction.highestBidderId);
  const activePlayer = players[auction.activePlayerIndex];
  const groupStyle = tile?.group ? GROUP_COLORS[tile.group] : null;

  const tileName = tile ? tile.name[language] || tile.name.ku_sorani : '';
  const cityName = tile?.city ? tile.city[language] || tile.city.ku_sorani : '';

  const isCurrentActiveAI = activePlayer?.isAI;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className="p-3 text-center text-white"
          style={{ backgroundColor: groupStyle ? groupStyle.headerBg : '#1e293b' }}
        >
          <span className="text-[10px] uppercase font-bold text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
            {language === 'ku_sorani' ? 'موزایەدەی ئاشکرا 🏷️' : language === 'ku_kurmanji' ? 'Muzayede' : 'Public Auction'}
          </span>
          {cityName && <p className="text-[10px] text-white/90 mt-1">{cityName}</p>}
          <h2 className="text-base font-black">{tileName}</h2>
        </div>

        {/* Current Bid info */}
        <div className="p-4 space-y-3 text-center">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">
              {language === 'ku_sorani' ? 'بەرزترین نرخ:' : 'Highest Bid:'}
            </span>
            <span className="text-2xl font-black text-amber-400">
              {auction.currentBid} IQD
            </span>
            {highestBidder ? (
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-slate-300">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: highestBidder.color }}
                />
                <span className="font-bold text-amber-300">{highestBidder.name}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-500 block mt-1">
                {language === 'ku_sorani' ? 'هێشتا هیچ کەس بڕی پارەی پێشکەش نەکردووە' : 'No bids yet'}
              </span>
            )}
          </div>

          {/* Active Turn in Auction */}
          {activePlayer && (
            <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between px-3">
              <span className="text-xs text-slate-400">
                {language === 'ku_sorani' ? 'سەرەی پێشنیار:' : 'Current Turn:'}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activePlayer.color }}
                />
                <span className="text-xs font-bold text-white">{activePlayer.name}</span>
                <span className="text-[10px] text-emerald-400 font-bold">({activePlayer.money} IQD)</span>
              </div>
            </div>
          )}

          {/* Bid Actions for Human Player */}
          {!isCurrentActiveAI && activePlayer && (
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-3 gap-1.5">
                {[10, 50, 100].map(inc => {
                  const targetBid = auction.currentBid + inc;
                  const canAfford = activePlayer.money >= targetBid;
                  return (
                    <button
                      key={inc}
                      type="button"
                      disabled={!canAfford}
                      onClick={() => {
                        soundEngine.playClick();
                        onBid(targetBid);
                      }}
                      className="py-2 px-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-black text-xs rounded-xl shadow disabled:opacity-40 transition"
                    >
                      +{inc} IQD
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onPass();
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs rounded-xl border border-rose-900/40 transition"
              >
                {language === 'ku_sorani' ? 'پاشگەزبوونەوە (Pass)' : 'Pass (Drop out)'}
              </button>
            </div>
          )}

          {isCurrentActiveAI && (
            <div className="py-3 text-xs text-amber-300 animate-pulse font-bold">
              {language === 'ku_sorani' ? 'ڕۆبۆت بیردەکاتەوە...' : 'AI is deciding bid...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
