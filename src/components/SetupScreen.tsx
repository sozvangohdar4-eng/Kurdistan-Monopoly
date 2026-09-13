import React, { useState } from 'react';
import { Player, GameSettings, Language, TokenId } from '../types/game';
import { PLAYER_TOKENS } from '../data/boardData';
import { soundEngine } from '../utils/soundEngine';

interface SetupScreenProps {
  onStartGame: (players: Player[], settings: GameSettings) => void;
  onResumeGame?: () => void;
  hasSavedGame: boolean;
  initialSettings: GameSettings;
}

const DEFAULT_PLAYER_PRESETS = [
  { name: 'کاک ئازاد (Azad)', token: 'lion' as TokenId, color: '#f59e0b', isAI: false },
  { name: 'شیلەر خان (Shiler)', token: 'samovar' as TokenId, color: '#10b981', isAI: true },
  { name: 'کاک نەبەز (Nabaz AI)', token: 'eagle' as TokenId, color: '#3b82f6', isAI: true },
  { name: 'ڕوناھی (Ronahi)', token: 'sun' as TokenId, color: '#ec4899', isAI: true }
];

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartGame,
  onResumeGame,
  hasSavedGame,
  initialSettings
}) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [playerConfigs, setPlayerConfigs] = useState(DEFAULT_PLAYER_PRESETS.slice(0, 3));
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');

  const language = settings.language;

  const handleAddPlayer = () => {
    if (playerConfigs.length >= 4) return;
    const nextIdx = playerConfigs.length;
    const preset = DEFAULT_PLAYER_PRESETS[nextIdx] || {
      name: `یاریزان ${nextIdx + 1}`,
      token: 'saz' as TokenId,
      color: '#8b5cf6',
      isAI: true
    };
    setPlayerConfigs([...playerConfigs, preset]);
    soundEngine.playClick();
  };

  const handleRemovePlayer = (index: number) => {
    if (playerConfigs.length <= 2) return;
    setPlayerConfigs(playerConfigs.filter((_, i) => i !== index));
    soundEngine.playClick();
  };

  const updatePlayer = (index: number, updates: Partial<typeof DEFAULT_PLAYER_PRESETS[0]>) => {
    setPlayerConfigs(
      playerConfigs.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const handleStart = () => {
    soundEngine.playCashSound();
    const players: Player[] = playerConfigs.map((cfg, idx) => ({
      id: `player_${idx}_${Date.now()}`,
      name: cfg.name.trim() || `یاریزان ${idx + 1}`,
      isAI: cfg.isAI,
      token: cfg.token,
      color: cfg.color,
      money: settings.startingMoney,
      position: 0,
      inJail: false,
      jailTurns: 0,
      hasGetOutOfJailCard: 0,
      isBankrupt: false,
      propertiesOwned: [],
      buildings: {},
      mortgaged: {},
      totalRounds: 0
    }));

    onStartGame(players, settings);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg space-y-4 my-auto">
        {/* Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-950/40 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="h-44 sm:h-52 w-full relative">
            <img
              src="/images/kurdish_monopoly_banner.jpg"
              alt="Kurdish Monopoly Mobile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <select
                value={settings.language}
                onChange={e => {
                  soundEngine.playClick();
                  setSettings({ ...settings, language: e.target.value as Language });
                }}
                className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold py-1 px-2.5 rounded-full outline-none"
              >
                <option value="ku_sorani">کوردی سۆرانی</option>
                <option value="ku_kurmanji">Kurdî Kurmancî</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div className="p-4 sm:p-5 -mt-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-2">
              <span>☀️</span>
              <span>
                {language === 'ku_sorani' ? 'یاری مۆبایلی بازرگانی و کەلەپووری کوردی' : 'Kurdish Heritage Real Estate Board Game'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              {language === 'ku_sorani' ? 'مۆنۆپۆلی کوردستان' : language === 'ku_kurmanji' ? 'Monopolya Kurdistanê' : 'Kurdistan Monopoly'}
            </h1>
          </div>
        </div>

        {/* Saved Game Resume Button */}
        {hasSavedGame && onResumeGame && (
          <button
            type="button"
            onClick={onResumeGame}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <span>▶️</span>
            <span>{language === 'ku_sorani' ? 'بەردەوامبوون لە یاریی پاشەکەوتکراو' : 'Resume Saved Game'}</span>
          </button>
        )}

        {/* Setup Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('quick');
              soundEngine.playClick();
            }}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'quick'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🤖 {language === 'ku_sorani' ? 'یاری دەستبەجێ (لەگەڵ AI)' : 'Play vs AI'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('custom');
              soundEngine.playClick();
            }}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'custom'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👥 {language === 'ku_sorani' ? 'یاری هاوبەش (Pass & Play)' : 'Pass & Play'}
          </button>
        </div>

        {/* Players Configuration Card */}
        <div className="bg-slate-900/90 rounded-3xl p-4 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-black text-sm text-amber-300">
              {language === 'ku_sorani' ? 'یاریزانەکان (٢ بۆ ٤)' : 'Players (2 to 4)'}
            </h3>
            {playerConfigs.length < 4 && (
              <button
                type="button"
                onClick={handleAddPlayer}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/30"
              >
                + {language === 'ku_sorani' ? 'زیادکردنی یاریزان' : 'Add Player'}
              </button>
            )}
          </div>

          {/* Player rows */}
          <div className="space-y-2.5">
            {playerConfigs.map((cfg, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {/* Token Icon Selector */}
                    <div className="relative">
                      <select
                        value={cfg.token}
                        onChange={e => {
                          const token = e.target.value as TokenId;
                          const tokenData = PLAYER_TOKENS.find(t => t.id === token);
                          updatePlayer(idx, { token, color: tokenData?.color || cfg.color });
                        }}
                        className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-center text-lg outline-none cursor-pointer appearance-none flex items-center justify-center pl-1"
                        style={{ backgroundColor: cfg.color }}
                      >
                        {PLAYER_TOKENS.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.emoji}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Player Name Input */}
                    <input
                      type="text"
                      value={cfg.name}
                      onChange={e => updatePlayer(idx, { name: e.target.value })}
                      placeholder={`یاریزان ${idx + 1}`}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 font-bold outline-none flex-1 focus:border-amber-400"
                    />
                  </div>

                  {/* AI vs Human Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      updatePlayer(idx, { isAI: !cfg.isAI });
                      soundEngine.playClick();
                    }}
                    className={`py-1.5 px-2.5 rounded-xl text-[10px] font-black border transition ${
                      cfg.isAI
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
                        : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    }`}
                  >
                    {cfg.isAI ? '🤖 AI Bot' : '👤 مرۆڤ (Human)'}
                  </button>

                  {/* Remove Player button */}
                  {playerConfigs.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(idx)}
                      className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 flex items-center justify-center font-bold text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Settings Card */}
        <div className="bg-slate-900/90 rounded-3xl p-4 border border-slate-800 shadow-xl space-y-3 text-xs">
          <h3 className="font-black text-sm text-amber-300 border-b border-slate-800 pb-2">
            {language === 'ku_sorani' ? 'ڕێکخستنەکانی یاری' : 'Game Options'}
          </h3>

          {/* Starting Money */}
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-bold">
              {language === 'ku_sorani' ? 'پارەی دەستپێک:' : 'Starting Cash:'}
            </span>
            <div className="flex gap-1.5">
              {[1000, 1500, 2000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setSettings({ ...settings, startingMoney: val });
                    soundEngine.playClick();
                  }}
                  className={`py-1 px-2.5 rounded-xl font-mono font-bold transition ${
                    settings.startingMoney === val
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {val} IQD
                </button>
              ))}
            </div>
          </div>

          {/* Seyran Jackpot toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300 font-bold">
              🌸 {language === 'ku_sorani' ? 'پاشەکەوتی باجی سەیران (Jackpot)' : 'Seyran Picnic Jackpot'}
            </span>
            <input
              type="checkbox"
              checked={settings.seyranJackpotEnabled}
              onChange={e => setSettings({ ...settings, seyranJackpotEnabled: e.target.checked })}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Auctions toggle */}
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-bold">
              🏷️ {language === 'ku_sorani' ? 'موزایەدەی کراوە بۆ موڵک' : 'Property Auctions'}
            </span>
            <input
              type="checkbox"
              checked={settings.auctionEnabled}
              onChange={e => setSettings({ ...settings, auctionEnabled: e.target.checked })}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 active:scale-95 transition"
        >
          {language === 'ku_sorani' ? 'دەستپێکردنی یاریی نوێ 🎲' : 'Start New Game 🎲'}
        </button>
      </div>
    </div>
  );
};
