import React from 'react';
import { GameLogEntry, Language } from '../types/game';

interface GameLogProps {
  logs: GameLogEntry[];
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const GameLog: React.FC<GameLogProps> = ({
  logs,
  language,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h2 className="text-sm sm:text-base font-black text-amber-300">
              {language === 'ku_sorani' ? 'تۆماری ڕووداوەکان' : language === 'ku_kurmanji' ? 'Tomara Bûyeran' : 'Game Events Log'}
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

        {/* Logs list */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1 text-xs">
          {logs.length === 0 ? (
            <p className="text-center text-slate-500 py-8">
              {language === 'ku_sorani' ? 'هێشتا هیچ ڕووداوێک تۆمار نەکراوە' : 'No events logged yet'}
            </p>
          ) : (
            logs.map(log => {
              const msg = log.message[language] || log.message.ku_sorani;

              const getIcon = () => {
                switch (log.type) {
                  case 'buy': return '🏙️';
                  case 'rent': return '💸';
                  case 'dice': return '🎲';
                  case 'jail': return '🔒';
                  case 'seyran': return '🌸';
                  case 'card': return '❓';
                  case 'tax': return '🏛️';
                  case 'build': return '🏗️';
                  case 'trade': return '🤝';
                  case 'bankrupt': return '💀';
                  case 'bonus': return '✨';
                  default: return '📌';
                }
              };

              return (
                <div
                  key={log.id}
                  className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-right"
                >
                  <span className="text-base mt-0.5">{getIcon()}</span>
                  <div className="flex-1">
                    <p className="text-slate-200 leading-snug">{msg}</p>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
