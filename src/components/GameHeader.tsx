import React from 'react';
import { Language } from '../types/game';
import { soundEngine } from '../utils/soundEngine';

interface GameHeaderProps {
  language: Language;
  turnCount: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onLanguageChange: (lang: Language) => void;
  onOpenRules: () => void;
  onOpenLogs: () => void;
  onNewGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  language,
  turnCount,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
  onLanguageChange,
  onOpenRules,
  onOpenLogs,
  onNewGame
}) => {
  return (
    <header className="w-full bg-slate-950/95 border-b border-amber-500/20 px-3 py-2 flex items-center justify-between gap-2 shadow-md backdrop-blur-md">
      {/* Title & Badge */}
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl drop-shadow">☀️</span>
        <div>
          <h1 className="text-xs sm:text-sm font-black bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent leading-none">
            {language === 'ku_sorani' ? 'مۆنۆپۆلی کوردستان' : language === 'ku_kurmanji' ? 'Monopolya Kurdistanê' : 'Kurdistan Monopoly'}
          </h1>
          <span className="text-[9px] text-slate-400 font-mono">
            {language === 'ku_sorani' ? `خولی: ${turnCount}` : language === 'ku_kurmanji' ? `Dor: ${turnCount}` : `Round: ${turnCount}`}
          </span>
        </div>
      </div>

      {/* Action Controls & Toggles */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Language selector dropdown */}
        <select
          value={language}
          onChange={e => {
            soundEngine.playClick();
            onLanguageChange(e.target.value as Language);
          }}
          className="bg-slate-900 border border-slate-700 text-amber-300 text-[10px] sm:text-xs font-bold py-1 px-1.5 rounded-lg outline-none cursor-pointer"
        >
          <option value="ku_sorani">کوردی سۆرانی</option>
          <option value="ku_kurmanji">Kurdî Kurmancî</option>
          <option value="en">English</option>
        </select>

        {/* Music button */}
        <button
          type="button"
          onClick={onToggleMusic}
          className={`p-1.5 rounded-lg border text-xs sm:text-sm transition ${
            musicEnabled
              ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-sm'
              : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}
          title="Kurdish Folk Music Loop"
        >
          {musicEnabled ? '🎵' : '🔇'}
        </button>

        {/* Sound FX button */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`p-1.5 rounded-lg border text-xs sm:text-sm transition ${
            soundEnabled
              ? 'bg-slate-800 border-slate-600 text-emerald-300 shadow-sm'
              : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}
          title="Sound Effects"
        >
          {soundEnabled ? '🔊' : '🔈'}
        </button>

        {/* Logs button */}
        <button
          type="button"
          onClick={onOpenLogs}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm transition"
          title="Game Logs"
        >
          📜
        </button>

        {/* Rules button */}
        <button
          type="button"
          onClick={onOpenRules}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:text-amber-200 text-xs sm:text-sm transition"
          title="Rules & Guide"
        >
          📖
        </button>

        {/* Restart / New Game */}
        <button
          type="button"
          onClick={onNewGame}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-rose-300 hover:text-rose-200 text-xs sm:text-sm transition"
          title="New Game"
        >
          🔄
        </button>
      </div>
    </header>
  );
};
