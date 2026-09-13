import React, { useState } from 'react';
import { Language } from '../types/game';
import { soundEngine } from '../utils/soundEngine';

interface SeyranWheelModalProps {
  jackpotAmount: number;
  language: Language;
  onCollectPot: () => void;
  onClose: () => void;
  onBonusReward: (amount: number, label: string) => void;
}

export const SeyranWheelModal: React.FC<SeyranWheelModalProps> = ({
  jackpotAmount,
  language,
  onCollectPot,
  onClose,
  onBonusReward
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<{ label: string; amount: number; emoji: string } | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes = [
    { label: language === 'ku_sorani' ? 'چای سەماوەری شاخ' : 'Mountain Samovar Tea', amount: 50, emoji: '🫖' },
    { label: language === 'ku_sorani' ? 'هەنگوینی پیرمام' : 'Pirmam Wild Honey', amount: 100, emoji: '🍯' },
    { label: language === 'ku_sorani' ? 'هەناری هەڵەبجە' : 'Halabja Pomegranate', amount: 75, emoji: '🍎' },
    { label: language === 'ku_sorani' ? 'گوێزی هەورامان' : 'Hawraman Walnuts', amount: 60, emoji: '🌰' },
    { label: language === 'ku_sorani' ? 'کەبابی بەتامی سلێمانی' : 'Kurdish Kebab Feast', amount: 80, emoji: '🍢' },
    { label: language === 'ku_sorani' ? 'خەڵاتی زێڕینی نەورۆز' : 'Newroz Golden Prize', amount: 150, emoji: '👑' }
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundEngine.playSeyranSound();

    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const segmentAngle = 360 / prizes.length;
    const finalAngle = rotation + extraRounds * 360 + randomPrizeIndex * segmentAngle;

    setRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const won = prizes[randomPrizeIndex];
      setSelectedPrize(won);
      onBonusReward(won.amount, won.label);
      soundEngine.playCashSound();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌸</span>
          <h2 className="text-lg sm:text-xl font-black text-emerald-300">
            {language === 'ku_sorani' ? 'سەیرانی بەهارەی کوردستان' : language === 'ku_kurmanji' ? 'Seyrana Biharê' : 'Spring Seyran Picnic'}
          </h2>
        </div>

        <p className="text-xs text-slate-300 mb-3 px-2">
          {language === 'ku_sorani'
            ? 'سەیران لە نێو گوڵە نێرگز و ساز و دەهۆڵ! پاشەکەوتی باجەکان ببەرەوە و چەرخی چایخانە بسوڕێنە!'
            : 'Enjoy Kurdish mountain picnic, collect municipal tax jackpots and spin for folk delicacies!'}
        </p>

        {/* Current Jackpot Pot */}
        <div className="w-full p-3 bg-emerald-900/40 border border-emerald-500/40 rounded-2xl mb-4 flex items-center justify-between">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-300/80 block">
              {language === 'ku_sorani' ? 'کەڵەکەبووی باجەکان' : 'Jackpot Pot'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-300">
              {jackpotAmount} IQD
            </span>
          </div>

          {jackpotAmount > 0 && (
            <button
              type="button"
              onClick={() => {
                onCollectPot();
                onClose();
              }}
              className="py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-black text-xs rounded-xl shadow active:scale-95 transition"
            >
              {language === 'ku_sorani' ? 'وەرگرتن 💰' : 'Collect 💰'}
            </button>
          )}
        </div>

        {/* Spinning Wheel Graphic */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-2 flex items-center justify-center">
          {/* Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-xl font-bold text-amber-400 drop-shadow">
            🔻
          </div>

          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden transition-transform ease-out duration-[2800ms] flex items-center justify-center bg-slate-950"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {prizes.map((p, idx) => {
              const angle = (360 / prizes.length) * idx;
              return (
                <div
                  key={idx}
                  className="absolute w-full h-full flex items-start justify-center pt-2"
                  style={{
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg">{p.emoji}</span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-amber-200">
                      +{p.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wheel Center Cap */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-white flex items-center justify-center text-slate-950 font-black text-xs shadow-md z-10 pointer-events-none">
            ☀️
          </div>
        </div>

        {/* Won Prize Banner */}
        {selectedPrize && (
          <div className="p-2.5 bg-amber-950/70 border border-amber-500/50 rounded-xl my-2 text-center animate-bounce">
            <span className="text-xs font-bold text-amber-300 block">
              {language === 'ku_sorani' ? `پیرۆزە! بەدەستهات: ${selectedPrize.emoji} ${selectedPrize.label}` : `Won: ${selectedPrize.emoji} ${selectedPrize.label}`}
            </span>
            <span className="text-sm font-black text-emerald-400">
              +{selectedPrize.amount} IQD
            </span>
          </div>
        )}

        {/* Spin Button */}
        <button
          type="button"
          disabled={isSpinning}
          onClick={handleSpin}
          className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg active:scale-95 disabled:opacity-50 transition"
        >
          {isSpinning
            ? (language === 'ku_sorani' ? 'دەسوڕێتەوە...' : 'Spinning...')
            : (language === 'ku_sorani' ? 'چەرخی سەیران بسوڕێنە 🎡' : 'Spin Picnic Wheel 🎡')}
        </button>
      </div>
    </div>
  );
};
