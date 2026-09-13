import React from 'react';
import { Language } from '../types/game';
import { RULE_TUTORIALS } from '../translations/i18n';

interface RulesModalProps {
  language: Language;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ language, onClose }) => {
  const sections = RULE_TUTORIALS[language] || RULE_TUTORIALS.ku_sorani;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-base font-black text-amber-300">
              {language === 'ku_sorani' ? 'ڕێبەری و یاساکانی مۆنۆپۆلی کوردستان' : language === 'ku_kurmanji' ? 'Rêzikên Lîstikê' : 'Kurdistan Monopoly Rules & Guide'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-sm font-bold hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-right text-xs sm:text-sm">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1.5 shadow-sm"
            >
              <h3 className="font-black text-amber-400 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-mono font-bold">
                  {idx + 1}
                </span>
                <span>{sec.title}</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs">
                {sec.content}
              </p>
            </div>
          ))}

          {/* Kurdish Cultural Note */}
          <div className="p-3 bg-amber-950/40 rounded-2xl border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
            <span className="font-bold block mb-1">☀️ دەربارەی ئەم یارییە:</span>
            {language === 'ku_sorani'
              ? 'ئەم یارییە بە فۆرماتێکی تایبەت و ڕەسەن دیزاین کراوە تا جوانی و دەوڵەمەندی شارە دێرینەکان و سروشتی کوردستانی مەزن پیشان بدات لە قەڵای هەولێر و گۆیژەوە تا زاخۆ، ئامێدی و هەڵەبجە.'
              : 'Designed with authentic Kurdish cultural motifs celebrating historic landmarks across Erbil, Sulaymaniyah, Duhok, Kirkuk, and Halabja.'}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs transition"
          >
            {language === 'ku_sorani' ? 'تێگەیشتم / دەستپێکردن' : 'Got it!'}
          </button>
        </div>
      </div>
    </div>
  );
};
