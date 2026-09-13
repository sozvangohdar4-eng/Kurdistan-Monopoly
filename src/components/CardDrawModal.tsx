import React from 'react';
import { GameCard, Language } from '../types/game';

interface CardDrawModalProps {
  card: GameCard | null;
  language: Language;
  onConfirm: () => void;
}

export const CardDrawModal: React.FC<CardDrawModalProps> = ({
  card,
  language,
  onConfirm
}) => {
  if (!card) return null;

  const isChance = card.type === 'chance';
  const title = card.title[language] || card.title.ku_sorani;
  const text = card.text[language] || card.text.ku_sorani;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 sm:p-6 shadow-2xl border-2 flex flex-col items-center text-center relative overflow-hidden ${
          isChance
            ? 'bg-gradient-to-b from-orange-950 via-slate-900 to-slate-950 border-orange-500/50 shadow-orange-950/50'
            : 'bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 border-blue-500/50 shadow-blue-950/50'
        }`}
      >
        {/* Kurdish Sun Glow Effect */}
        <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />

        {/* Badge Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          <span>{isChance ? '❓' : '📦'}</span>
          <span>
            {isChance
              ? (language === 'ku_sorani' ? 'بەختی خۆت' : language === 'ku_kurmanji' ? 'Bextê Te' : 'Chance Card')
              : (language === 'ku_sorani' ? 'خەزێنەی گشتی' : language === 'ku_kurmanji' ? 'Xezîneya Giştî' : 'Community Chest')}
          </span>
        </div>

        {/* Large Visual Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner my-2">
          {card.icon || (isChance ? '🌟' : '🏛️')}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-amber-200 mt-2 mb-2 leading-tight">
          {title}
        </h3>

        {/* Card Event Content */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed my-2 px-2">
          {text}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onConfirm}
          className="mt-4 w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95 transition"
        >
          {language === 'ku_sorani' ? 'باشە / جێبەجێکردن ✨' : language === 'ku_kurmanji' ? 'Baş e / Pejirandin' : 'Collect / Continue'}
        </button>
      </div>
    </div>
  );
};
