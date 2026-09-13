import React from 'react';

interface DiceRollerProps {
  dice: [number, number];
  isRolling: boolean;
  disabled: boolean;
  onRoll: () => void;
  isDouble: boolean;
  language: 'ku_sorani' | 'ku_kurmanji' | 'en';
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  dice,
  isRolling,
  disabled,
  onRoll,
  isDouble,
  language
}) => {
  const renderDiceDots = (value: number) => {
    // 3x3 dot grid mapping for standard die
    const dotPositions: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };

    const activeDots = dotPositions[value] || [4];

    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-1.5 sm:p-2">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {activeDots.includes(idx) && (
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-900 shadow-inner" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const rollButtonText = {
    ku_sorani: isRolling ? 'دەخولێتەوە...' : 'زار بهاوێژە 🎲',
    ku_kurmanji: isRolling ? 'Dizivire...' : 'Zaran Bavêje 🎲',
    en: isRolling ? 'Rolling...' : 'Roll Dice 🎲'
  }[language];

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-xl backdrop-blur-md">
      {/* Dice Pair Display */}
      <div className="flex items-center gap-3">
        {/* Die 1 */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-100 via-white to-amber-200 border-2 border-amber-300 shadow-lg shadow-black/40 flex items-center justify-center transition-all duration-300 transform ${
            isRolling ? 'animate-spin scale-95' : 'hover:scale-105'
          } ${isDouble ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-900' : ''}`}
        >
          {renderDiceDots(dice[0])}
        </div>

        {/* Die 2 */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-100 via-white to-amber-200 border-2 border-amber-300 shadow-lg shadow-black/40 flex items-center justify-center transition-all duration-300 transform ${
            isRolling ? 'animate-spin scale-95 [animation-direction:reverse]' : 'hover:scale-105'
          } ${isDouble ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-900' : ''}`}
        >
          {renderDiceDots(dice[1])}
        </div>
      </div>

      {/* Double Dice notification */}
      {isDouble && !isRolling && (
        <span className="text-[11px] font-extrabold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
          {language === 'ku_sorani' ? 'دووانە! جارێکی تر بهاوێژە ✨' : language === 'ku_kurmanji' ? 'Duhev! Dîsa bavêje ✨' : 'Doubles! Roll Again ✨'}
        </span>
      )}

      {/* Interactive Roll Button */}
      <button
        type="button"
        disabled={disabled || isRolling}
        onClick={onRoll}
        className={`w-full py-2 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 ${
          disabled || isRolling
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black shadow-amber-500/20 active:scale-95 border border-yellow-300'
        }`}
      >
        <span>{rollButtonText}</span>
      </button>
    </div>
  );
};
