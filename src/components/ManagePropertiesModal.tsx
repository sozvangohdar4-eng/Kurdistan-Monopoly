import React from 'react';
import { Player, Language, PropertyGroup } from '../types/game';
import { BOARD_TILES, GROUP_COLORS, GROUP_MEMBERS } from '../data/boardData';
import { checkHasMonopoly } from '../utils/gameStorage';
import { soundEngine } from '../utils/soundEngine';

interface ManagePropertiesModalProps {
  player: Player;
  language: Language;
  onClose: () => void;
  onBuild: (tileId: number) => void;
  onSellBuilding: (tileId: number) => void;
  onMortgage: (tileId: number) => void;
  onUnmortgage: (tileId: number) => void;
}

export const ManagePropertiesModal: React.FC<ManagePropertiesModalProps> = ({
  player,
  language,
  onClose,
  onBuild,
  onSellBuilding,
  onMortgage,
  onUnmortgage
}) => {
  // Group player properties by group
  const ownedGroups: Partial<Record<PropertyGroup, number[]>> = {};

  player.propertiesOwned.forEach(tileId => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (tile?.group) {
      if (!ownedGroups[tile.group]) {
        ownedGroups[tile.group] = [];
      }
      ownedGroups[tile.group]!.push(tileId);
    }
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full ring-2 ring-white"
              style={{ backgroundColor: player.color }}
            />
            <h2 className="text-sm sm:text-base font-black text-amber-300">
              {language === 'ku_sorani' ? `بەڕێوەبردنی موڵکەکانی ${player.name}` : `Manage ${player.name}'s Empire`}
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

        {/* Body */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {Object.keys(ownedGroups).length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <span className="text-3xl block mb-2">🏙️</span>
              <p>{language === 'ku_sorani' ? 'هێشتا هیچ موڵکێکت نەکڕیوە!' : 'You do not own any properties yet!'}</p>
            </div>
          ) : (
            (Object.keys(ownedGroups) as PropertyGroup[]).map(groupKey => {
              const tileIds = ownedGroups[groupKey] || [];
              const allMembers = GROUP_MEMBERS[groupKey] || [];
              const hasMonopoly = checkHasMonopoly(player, groupKey);
              const groupStyle = GROUP_COLORS[groupKey];

              return (
                <div
                  key={groupKey}
                  className="bg-slate-950 rounded-2xl p-3 border border-slate-800 space-y-2.5"
                >
                  {/* Group Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-md"
                        style={{ backgroundColor: groupStyle.headerBg }}
                      />
                      <span className="font-black text-slate-100 uppercase tracking-wider">
                        {groupKey}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({tileIds.length}/{allMembers.length})
                      </span>
                    </div>

                    {hasMonopoly ? (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 font-black px-2 py-0.5 rounded-full border border-emerald-500/40">
                        {language === 'ku_sorani' ? 'کۆمەڵەی تەواو ✨' : 'Monopoly Complete ✨'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">
                        {language === 'ku_sorani' ? 'کۆمەڵە تەواو نییە' : 'Incomplete'}
                      </span>
                    )}
                  </div>

                  {/* Properties in this group */}
                  <div className="space-y-2">
                    {tileIds.map(tileId => {
                      const tile = BOARD_TILES.find(t => t.id === tileId);
                      if (!tile) return null;
                      const buildings = player.buildings[tileId] || 0;
                      const isMortgaged = player.mortgaged[tileId] || false;

                      return (
                        <div
                          key={tileId}
                          className={`p-2 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                            isMortgaged
                              ? 'bg-rose-950/30 border-rose-900/50'
                              : 'bg-slate-900/80 border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{tile.icon || '🏛️'}</span>
                            <div>
                              <span className="font-bold text-slate-100 text-[11px] sm:text-xs block">
                                {tile.name[language] || tile.name.ku_sorani}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span>{tile.price} IQD</span>
                                {buildings > 0 && (
                                  <span className="text-amber-300 font-bold">
                                    {buildings === 5 ? '🏰 ڤێلا' : `${buildings}x 🏠 خانوو`}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-1.5 self-end sm:self-center flex-wrap">
                            {/* Build House */}
                            {hasMonopoly && tile.houseCost && buildings < 5 && !isMortgaged && (
                              <button
                                type="button"
                                disabled={player.money < tile.houseCost}
                                onClick={() => {
                                  soundEngine.playBuildSound();
                                  onBuild(tileId);
                                }}
                                className="py-1 px-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg text-[10px] font-bold transition shadow"
                              >
                                {buildings === 4 ? '+ ڤێلا 🏰' : `+ خانوو (${tile.houseCost})`}
                              </button>
                            )}

                            {/* Sell House */}
                            {buildings > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  soundEngine.playCashSound();
                                  onSellBuilding(tileId);
                                }}
                                className="py-1 px-2 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-lg text-[10px] font-bold border border-slate-700 transition"
                              >
                                {language === 'ku_sorani' ? '- فرۆشتن' : '- Sell'}
                              </button>
                            )}

                            {/* Mortgage */}
                            {!isMortgaged && buildings === 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  soundEngine.playCashSound();
                                  onMortgage(tileId);
                                }}
                                className="py-1 px-2 bg-amber-900 hover:bg-amber-800 text-amber-200 rounded-lg text-[10px] font-bold transition"
                              >
                                {language === 'ku_sorani' ? `ڕەهن (+${tile.mortgageValue})` : `Mortgage`}
                              </button>
                            )}

                            {/* Unmortgage */}
                            {isMortgaged && (
                              <button
                                type="button"
                                disabled={player.money < Math.round((tile.mortgageValue || 0) * 1.1)}
                                onClick={() => {
                                  soundEngine.playCashSound();
                                  onUnmortgage(tileId);
                                }}
                                className="py-1 px-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg text-[10px] font-bold transition"
                              >
                                {language === 'ku_sorani' ? 'لابردنی ڕەهن' : 'Unmortgage'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition"
          >
            {language === 'ku_sorani' ? 'تەواو / داخستن' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
