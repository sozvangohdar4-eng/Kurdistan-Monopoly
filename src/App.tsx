import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  Player,
  GameSettings,
  TradeOffer,
  GameLogEntry
} from './types/game';
import { BOARD_TILES } from './data/boardData';
import { CHANCE_CARDS } from './data/chanceCards';
import { CHEST_CARDS } from './data/chestCards';
import { soundEngine } from './utils/soundEngine';
import {
  shouldAIBuyProperty,
  getAIBestBuildMove,
  getAIAuctionBid,
  evaluateAITradeOffer
} from './utils/aiLogic';
import {
  saveGameState,
  loadSavedGameState,
  clearSavedGameState,
  calculateRent
} from './utils/gameStorage';

import { GameHeader } from './components/GameHeader';
import { PlayerStatsBar } from './components/PlayerStatsBar';
import { Board } from './components/Board';
import { ActionControls } from './components/ActionControls';
import { PropertyModal } from './components/PropertyModal';
import { TradeModal } from './components/TradeModal';
import { ManagePropertiesModal } from './components/ManagePropertiesModal';
import { CardDrawModal } from './components/CardDrawModal';
import { SeyranWheelModal } from './components/SeyranWheelModal';
import { AuctionModal } from './components/AuctionModal';
import { GameLog } from './components/GameLog';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';
import { SetupScreen } from './components/SetupScreen';

const DEFAULT_SETTINGS: GameSettings = {
  language: 'ku_sorani',
  startingMoney: 1500,
  fastMode: false,
  seyranJackpotEnabled: true,
  auctionEnabled: true,
  soundEnabled: true,
  musicEnabled: false,
  vibrationEnabled: true
};

export const App: React.FC = () => {
  const [inSetup, setInSetup] = useState<boolean>(true);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isTradeOpen, setIsTradeOpen] = useState(false);
  const [isSeyranWheelOpen, setIsSeyranWheelOpen] = useState(false);

  // Core Game State
  const [state, setState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    dice: [1, 2],
    isRolling: false,
    hasRolled: false,
    doubleCount: 0,
    jackpot: 150,
    phase: 'idle',
    activeCard: null,
    auction: null,
    pendingTrade: null,
    selectedTileId: null,
    logs: [],
    winnerId: null,
    turnCount: 1,
    settings: DEFAULT_SETTINGS
  });

  const aiActionTimerRef = useRef<any>(null);

  // Check saved game on mount
  useEffect(() => {
    const saved = loadSavedGameState();
    if (saved && saved.players && saved.players.length >= 2 && !saved.winnerId) {
      setHasSavedGame(true);
    }
  }, []);

  // Sync HTML dir and lang attribute
  useEffect(() => {
    const lang = state.settings.language;
    document.documentElement.lang = lang === 'ku_sorani' ? 'ku' : lang === 'ku_kurmanji' ? 'ku-TR' : 'en';
    document.documentElement.dir = lang === 'ku_sorani' ? 'rtl' : 'ltr';
  }, [state.settings.language]);

  // Audio settings sync
  useEffect(() => {
    soundEngine.toggleMusic(state.settings.musicEnabled);
  }, [state.settings.musicEnabled]);

  const addLog = useCallback((type: GameLogEntry['type'], msgSorani: string, msgKurmanji: string, msgEn: string, playerId?: string) => {
    const entry: GameLogEntry = {
      id: `log_${Date.now()}_${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      message: {
        ku_sorani: msgSorani,
        ku_kurmanji: msgKurmanji,
        en: msgEn
      },
      playerId
    };
    setState(prev => ({
      ...prev,
      logs: [entry, ...prev.logs.slice(0, 50)]
    }));
  }, []);

  // Start new game
  const handleStartGame = (players: Player[], settings: GameSettings) => {
    const initial: GameState = {
      players,
      currentPlayerIndex: 0,
      dice: [1, 1],
      isRolling: false,
      hasRolled: false,
      doubleCount: 0,
      jackpot: 200,
      phase: 'idle',
      activeCard: null,
      auction: null,
      pendingTrade: null,
      selectedTileId: null,
      logs: [],
      winnerId: null,
      turnCount: 1,
      settings
    };

    setState(initial);
    setInSetup(false);
    saveGameState(initial);
    addLog(
      'bonus',
      'یاری مۆنۆپۆلی کوردستان دەستی پێکرد! بەخێربێن.',
      'Lîstika Monopolya Kurdistanê dest pê kir! Hûn bi xêr hatin.',
      'Kurdistan Monopoly mobile match started! Welcome to Kurdistan.'
    );
  };

  // Resume saved game
  const handleResumeGame = () => {
    const saved = loadSavedGameState();
    if (saved) {
      setState(saved);
      setInSetup(false);
      soundEngine.playClick();
    }
  };

  const currentPlayer = state.players[state.currentPlayerIndex];
  const currentTile = currentPlayer ? BOARD_TILES[currentPlayer.position] : BOARD_TILES[0];

  // End Current Turn
  const handleEndTurn = useCallback(() => {
    setState(prev => {
      // Check if game is over (only 1 player not bankrupt)
      const activePlayers = prev.players.filter(p => !p.isBankrupt);
      if (activePlayers.length <= 1) {
        const winner = activePlayers[0] || prev.players[0];
        return {
          ...prev,
          phase: 'game_over',
          winnerId: winner.id
        };
      }

      // Next active player
      let nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      while (prev.players[nextIndex].isBankrupt) {
        nextIndex = (nextIndex + 1) % prev.players.length;
      }

      const isNextRound = nextIndex === 0;

      const updated: GameState = {
        ...prev,
        currentPlayerIndex: nextIndex,
        hasRolled: false,
        doubleCount: 0,
        phase: 'idle',
        activeCard: null,
        selectedTileId: null,
        turnCount: isNextRound ? prev.turnCount + 1 : prev.turnCount
      };

      saveGameState(updated);
      return updated;
    });
  }, []);

  // Send player to jail
  const sendToJail = useCallback((playerId: string) => {
    soundEngine.playJailSound();
    setState(prev => {
      const players = prev.players.map(p => {
        if (p.id === playerId) {
          return {
            ...p,
            position: 10, // Jail tile
            inJail: true,
            jailTurns: 3
          };
        }
        return p;
      });

      const jailedPlayer = prev.players.find(p => p.id === playerId);
      if (jailedPlayer) {
        addLog(
          'jail',
          `${jailedPlayer.name} دەستبەسەرکرا و برایە زیندان! 🔒`,
          `${jailedPlayer.name} kete zîndanê! 🔒`,
          `${jailedPlayer.name} was arrested and sent to Jail! 🔒`,
          jailedPlayer.id
        );
      }

      return {
        ...prev,
        players,
        hasRolled: true,
        phase: 'idle'
      };
    });
  }, [addLog]);

  // Handle Card Effect
  const executeCardAction = useCallback((card: typeof state.activeCard) => {
    if (!card) return;
    const player = state.players[state.currentPlayerIndex];
    if (!player) return;

    soundEngine.playCardSound();

    switch (card.action) {
      case 'collect':
        if (card.amount) {
          setState(prev => ({
            ...prev,
            players: prev.players.map(p =>
              p.id === player.id ? { ...p, money: p.money + (card.amount || 0) } : p
            )
          }));
          soundEngine.playCashSound();
        }
        break;

      case 'pay':
        if (card.amount) {
          setState(prev => ({
            ...prev,
            players: prev.players.map(p =>
              p.id === player.id ? { ...p, money: p.money - (card.amount || 0) } : p
            ),
            jackpot: prev.jackpot + (card.amount || 0)
          }));
        }
        break;

      case 'move_to':
        if (card.targetPosition !== undefined) {
          setState(prev => {
            const willPassGo = card.targetPosition! < player.position;
            const updated = prev.players.map(p => {
              if (p.id === player.id) {
                return {
                  ...p,
                  position: card.targetPosition!,
                  money: willPassGo ? p.money + 200 : p.money
                };
              }
              return p;
            });

            if (willPassGo) {
              soundEngine.playPassGoSound();
            }

            return {
              ...prev,
              players: updated,
              selectedTileId: card.targetPosition ?? null
            };
          });
        }
        break;

      case 'move_steps':
        if (card.steps) {
          setState(prev => ({
            ...prev,
            players: prev.players.map(p => {
              if (p.id === player.id) {
                const newPos = (p.position + card.steps! + 40) % 40;
                return { ...p, position: newPos };
              }
              return p;
            })
          }));
        }
        break;

      case 'go_to_jail':
        sendToJail(player.id);
        break;

      case 'get_out_of_jail':
        setState(prev => ({
          ...prev,
          players: prev.players.map(p =>
            p.id === player.id
              ? { ...p, hasGetOutOfJailCard: p.hasGetOutOfJailCard + 1 }
              : p
          )
        }));
        break;

      case 'collect_from_all':
        if (card.amount) {
          const amt = card.amount;
          setState(prev => {
            const othersCount = prev.players.filter(p => p.id !== player.id && !p.isBankrupt).length;
            return {
              ...prev,
              players: prev.players.map(p => {
                if (p.id === player.id) {
                  return { ...p, money: p.money + amt * othersCount };
                }
                if (!p.isBankrupt) {
                  return { ...p, money: p.money - amt };
                }
                return p;
              })
            };
          });
          soundEngine.playCashSound();
        }
        break;

      case 'pay_repairs': {
        const hCost = card.houseCost || 25;
        const vCost = card.hotelCost || 100;
        let totalRepairs = 0;
        Object.values(player.buildings).forEach(count => {
          if (count === 5) totalRepairs += vCost;
          else totalRepairs += count * hCost;
        });

        setState(prev => ({
          ...prev,
          players: prev.players.map(p =>
            p.id === player.id ? { ...p, money: p.money - totalRepairs } : p
          ),
          jackpot: prev.jackpot + totalRepairs
        }));
        break;
      }
    }

    setState(prev => ({ ...prev, activeCard: null, phase: 'idle' }));
  }, [state.activeCard, state.currentPlayerIndex, state.players, sendToJail]);

  // Handle Tile Landing Resolution
  const handleTileLanding = useCallback((tileId: number, diceSum: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile) return;

    const player = state.players[state.currentPlayerIndex];
    if (!player) return;

    // Corner: Go to Jail
    if (tile.type === 'go_to_jail') {
      sendToJail(player.id);
      return;
    }

    // Corner: Seyran (Free Parking / Picnic)
    if (tile.type === 'seyran') {
      soundEngine.playSeyranSound();
      if (state.settings.seyranJackpotEnabled && state.jackpot > 0) {
        const pot = state.jackpot;
        setState(prev => ({
          ...prev,
          players: prev.players.map(p =>
            p.id === player.id ? { ...p, money: p.money + pot } : p
          ),
          jackpot: 100
        }));
        soundEngine.playCashSound();
        addLog(
          'seyran',
          `${player.name} گەیشتە سەیرانی بەهارە و پاشەکەوتی باجەکانی وەرگرت (${pot} دینار)! 🌸`,
          `${player.name} gihîşt Seyrana Biharê û ${pot} dînar xelat wergirt! 🌸`,
          `${player.name} visited Spring Seyran Picnic and won the jackpot pot of ${pot} IQD! 🌸`,
          player.id
        );
      }
      return;
    }

    // Tax Tiles
    if (tile.type === 'tax' && tile.taxAmount) {
      const taxAmt = tile.taxAmount;
      soundEngine.playCashSound();
      setState(prev => ({
        ...prev,
        players: prev.players.map(p =>
          p.id === player.id ? { ...p, money: p.money - taxAmt } : p
        ),
        jackpot: prev.jackpot + taxAmt
      }));
      addLog(
        'tax',
        `${player.name} باجی دا بە بڕی ${taxAmt} دینار.`,
        `${player.name} ${taxAmt} dînar bac da.`,
        `${player.name} paid ${taxAmt} IQD tax to the public fund.`,
        player.id
      );
      return;
    }

    // Chance Cards
    if (tile.type === 'chance') {
      const randomCard = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
      setState(prev => ({
        ...prev,
        activeCard: randomCard,
        phase: 'card_drawn'
      }));
      soundEngine.playCardSound();
      return;
    }

    // Community Chest Cards
    if (tile.type === 'chest') {
      const randomCard = CHEST_CARDS[Math.floor(Math.random() * CHEST_CARDS.length)];
      setState(prev => ({
        ...prev,
        activeCard: randomCard,
        phase: 'card_drawn'
      }));
      soundEngine.playCardSound();
      return;
    }

    // Street Property / Railroad / Utility
    if (tile.type === 'property' || tile.type === 'railroad' || tile.type === 'utility') {
      const owner = state.players.find(p => p.propertiesOwned.includes(tile.id));

      // If unowned
      if (!owner) {
        setState(prev => ({ ...prev, phase: 'tile_action', selectedTileId: tile.id }));
        return;
      }

      // If owned by another player (and not mortgaged)
      if (owner.id !== player.id && !owner.mortgaged[tile.id]) {
        const rentAmt = calculateRent(tile.id, owner, diceSum);
        if (rentAmt > 0) {
          soundEngine.playCashSound();
          setState(prev => ({
            ...prev,
            players: prev.players.map(p => {
              if (p.id === player.id) {
                return { ...p, money: p.money - rentAmt };
              }
              if (p.id === owner.id) {
                return { ...p, money: p.money + rentAmt };
              }
              return p;
            })
          }));
          addLog(
            'rent',
            `${player.name} کرێی ${rentAmt} دیناری دا بە ${owner.name} بۆ ${tile.name.ku_sorani}.`,
            `${player.name} ${rentAmt} dînar kirê da ${owner.name}.`,
            `${player.name} paid ${rentAmt} IQD rent to ${owner.name} for ${tile.name.en}.`,
            player.id
          );
        }
      }
    }
  }, [state.players, state.currentPlayerIndex, state.jackpot, state.settings.seyranJackpotEnabled, sendToJail, addLog]);

  // Roll Dice Action
  const handleRollDice = useCallback(() => {
    if (state.isRolling) return;

    soundEngine.playDiceRoll();
    setState(prev => ({ ...prev, isRolling: true }));

    setTimeout(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const sum = die1 + die2;
      const isDouble = die1 === die2;

      setState(prev => {
        const player = prev.players[prev.currentPlayerIndex];
        if (!player) return prev;

        const nextDoubleCount = isDouble ? prev.doubleCount + 1 : 0;

        // In Jail check
        if (player.inJail) {
          if (isDouble) {
            // Freed by doubles!
            soundEngine.playPassGoSound();
            const updatedPlayers = prev.players.map(p =>
              p.id === player.id ? { ...p, inJail: false, jailTurns: 0 } : p
            );
            return {
              ...prev,
              dice: [die1, die2],
              isRolling: false,
              hasRolled: true,
              doubleCount: 0,
              players: updatedPlayers
            };
          } else {
            // Still in jail
            const turnsLeft = player.jailTurns - 1;
            const updatedPlayers = prev.players.map(p => {
              if (p.id === player.id) {
                if (turnsLeft <= 0) {
                  // Pay 50 and exit
                  return { ...p, inJail: false, jailTurns: 0, money: p.money - 50 };
                }
                return { ...p, jailTurns: turnsLeft };
              }
              return p;
            });

            return {
              ...prev,
              dice: [die1, die2],
              isRolling: false,
              hasRolled: true,
              doubleCount: 0,
              players: updatedPlayers
            };
          }
        }

        // 3 consecutive doubles -> Go to Jail
        if (nextDoubleCount === 3) {
          sendToJail(player.id);
          return {
            ...prev,
            dice: [die1, die2],
            isRolling: false,
            hasRolled: true,
            doubleCount: 0
          };
        }

        // Normal movement
        const oldPos = player.position;
        const newPos = (oldPos + sum) % 40;
        const passedGo = newPos < oldPos;

        if (passedGo) {
          soundEngine.playPassGoSound();
          addLog(
            'bonus',
            `${player.name} بەسەر دەستپێکدا تێپەڕی و ٢٠٠ دیناری پاداشتی وەرگرت! 🚀`,
            `${player.name} di ser Destpêkê re derbas bû û 200 dînar xelat wergirt!`,
            `${player.name} passed START and collected 200 IQD salary! 🚀`,
            player.id
          );
        }

        const updatedPlayers = prev.players.map(p => {
          if (p.id === player.id) {
            return {
              ...p,
              position: newPos,
              money: passedGo ? p.money + 200 : p.money
            };
          }
          return p;
        });

        return {
          ...prev,
          dice: [die1, die2],
          isRolling: false,
          hasRolled: true,
          doubleCount: nextDoubleCount,
          players: updatedPlayers,
          selectedTileId: newPos
        };
      });

      // Resolve tile effect after dice settles
      setTimeout(() => {
        const cur = state.players[state.currentPlayerIndex];
        const newPos = cur ? (cur.position + sum) % 40 : 0;
        handleTileLanding(newPos, sum);
      }, 350);
    }, 600);
  }, [state.isRolling, state.players, state.currentPlayerIndex, handleTileLanding, sendToJail, addLog]);

  // Buy Property
  const handleBuyProperty = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile || !tile.price) return;

    soundEngine.playBuySound();
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      if (!player || player.money < tile.price!) return prev;

      const updated = prev.players.map(p => {
        if (p.id === player.id) {
          return {
            ...p,
            money: p.money - tile.price!,
            propertiesOwned: [...p.propertiesOwned, tileId]
          };
        }
        return p;
      });

      addLog(
        'buy',
        `${player.name} شوێنی ${tile.name.ku_sorani}ی کڕی بە ${tile.price} دینار! 🏙️`,
        `${player.name} ${tile.name.ku_kurmanji} bi ${tile.price} dînar kirî!`,
        `${player.name} bought ${tile.name.en} for ${tile.price} IQD! 🏙️`,
        player.id
      );

      return {
        ...prev,
        players: updated,
        phase: 'idle'
      };
    });
  };

  // Build House
  const handleBuildHouse = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile || !tile.houseCost) return;

    soundEngine.playBuildSound();
    setState(prev => {
      const player = prev.players.find(p => p.propertiesOwned.includes(tileId));
      if (!player || player.money < tile.houseCost!) return prev;

      const currentCount = player.buildings[tileId] || 0;
      if (currentCount >= 5) return prev;

      const updatedBuildings = { ...player.buildings, [tileId]: currentCount + 1 };
      const updatedPlayers = prev.players.map(p =>
        p.id === player.id
          ? { ...p, money: p.money - tile.houseCost!, buildings: updatedBuildings }
          : p
      );

      const isHotel = currentCount + 1 === 5;
      addLog(
        'build',
        isHotel
          ? `${player.name} کۆشکێکی شاهانەی لە ${tile.name.ku_sorani} دروستکرد! 🏰`
          : `${player.name} خانوویەکی نوێی لە ${tile.name.ku_sorani} دروستکرد! 🏠`,
        isHotel
          ? `${player.name} koşkek li ser ${tile.name.ku_kurmanji} çêkir!`
          : `${player.name} xanîyek nû li ser ${tile.name.ku_kurmanji} çêkir!`,
        isHotel
          ? `${player.name} built a royal palace on ${tile.name.en}! 🏰`
          : `${player.name} built a traditional house on ${tile.name.en}! 🏠`,
        player.id
      );

      return { ...prev, players: updatedPlayers };
    });
  };

  // Sell Building
  const handleSellBuilding = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile || !tile.houseCost) return;

    soundEngine.playCashSound();
    setState(prev => {
      const player = prev.players.find(p => p.propertiesOwned.includes(tileId));
      if (!player) return prev;
      const count = player.buildings[tileId] || 0;
      if (count <= 0) return prev;

      const refund = Math.floor(tile.houseCost! / 2);
      const updatedBuildings = { ...player.buildings, [tileId]: count - 1 };
      const updatedPlayers = prev.players.map(p =>
        p.id === player.id
          ? { ...p, money: p.money + refund, buildings: updatedBuildings }
          : p
      );

      return { ...prev, players: updatedPlayers };
    });
  };

  // Mortgage
  const handleMortgage = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile || !tile.mortgageValue) return;

    soundEngine.playCashSound();
    setState(prev => {
      const player = prev.players.find(p => p.propertiesOwned.includes(tileId));
      if (!player) return prev;

      const updatedMortgaged = { ...player.mortgaged, [tileId]: true };
      const updatedPlayers = prev.players.map(p =>
        p.id === player.id
          ? { ...p, money: p.money + tile.mortgageValue!, mortgaged: updatedMortgaged }
          : p
      );

      addLog(
        'mortgage',
        `${player.name} شوێنی ${tile.name.ku_sorani}ی خستە بارمتە (+${tile.mortgageValue} دینار).`,
        `${player.name} ${tile.name.ku_kurmanji} rehn kir.`,
        `${player.name} mortgaged ${tile.name.en} for +${tile.mortgageValue} IQD.`,
        player.id
      );

      return { ...prev, players: updatedPlayers };
    });
  };

  // Unmortgage
  const handleUnmortgage = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile || !tile.mortgageValue) return;

    const cost = Math.round(tile.mortgageValue * 1.1);

    soundEngine.playCashSound();
    setState(prev => {
      const player = prev.players.find(p => p.propertiesOwned.includes(tileId));
      if (!player || player.money < cost) return prev;

      const updatedMortgaged = { ...player.mortgaged, [tileId]: false };
      const updatedPlayers = prev.players.map(p =>
        p.id === player.id
          ? { ...p, money: p.money - cost, mortgaged: updatedMortgaged }
          : p
      );

      return { ...prev, players: updatedPlayers };
    });
  };

  // Pay Bail
  const handlePayBail = () => {
    soundEngine.playCashSound();
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      if (!player || player.money < 50) return prev;

      const updated = prev.players.map(p =>
        p.id === player.id ? { ...p, inJail: false, jailTurns: 0, money: p.money - 50 } : p
      );

      addLog(
        'jail',
        `${player.name} سزای ٥٠ دیناری دا و لە زیندان ئازاد کرا! 🕊️`,
        `${player.name} 50 dînar da û ji zîndanê derket! 🕊️`,
        `${player.name} paid 50 IQD bail fine and was released from Jail! 🕊️`,
        player.id
      );

      return { ...prev, players: updated };
    });
  };

  // Use Jail Card
  const handleUseJailCard = () => {
    soundEngine.playPassGoSound();
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      if (!player || player.hasGetOutOfJailCard <= 0) return prev;

      const updated = prev.players.map(p =>
        p.id === player.id
          ? { ...p, inJail: false, jailTurns: 0, hasGetOutOfJailCard: p.hasGetOutOfJailCard - 1 }
          : p
      );

      addLog(
        'jail',
        `${player.name} کارتی لێخۆشبوونی بەکارهێنا و لە زیندان هاتە دەرەوە! 🗝️`,
        `${player.name} qerta rizgariyê bikar anî! 🗝️`,
        `${player.name} used a Get Out of Jail Free card! 🗝️`,
        player.id
      );

      return { ...prev, players: updated };
    });
  };

  // Declare Bankruptcy
  const handleDeclareBankruptcy = useCallback((playerId?: string) => {
    const targetId = playerId || state.players[state.currentPlayerIndex]?.id;
    if (!targetId) return;

    soundEngine.playBankruptSound();
    setState(prev => {
      const player = prev.players.find(p => p.id === targetId);
      if (!player) return prev;

      const updatedPlayers = prev.players.map(p =>
        p.id === targetId ? { ...p, isBankrupt: true, money: 0, propertiesOwned: [] } : p
      );

      addLog(
        'bankrupt',
        `${player.name} ئیفلاسی ڕاگەیاند و لە یارییەکە چووە دەرەوە! 💀`,
        `${player.name} îflas kir û ji lîstikê derket! 💀`,
        `${player.name} declared bankruptcy and is eliminated! 💀`,
        player.id
      );

      const active = updatedPlayers.filter(p => !p.isBankrupt);
      if (active.length <= 1) {
        return {
          ...prev,
          players: updatedPlayers,
          phase: 'game_over',
          winnerId: active[0]?.id || null
        };
      }

      return {
        ...prev,
        players: updatedPlayers,
        hasRolled: true
      };
    });
  }, [state.players, state.currentPlayerIndex, addLog]);

  // Start Auction
  const handleStartAuction = (tileId: number) => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (!tile) return;

    const initialBid = Math.max(10, Math.floor((tile.price || 100) * 0.1));
    setState(prev => ({
      ...prev,
      phase: 'auction',
      auction: {
        tileId,
        currentBid: initialBid,
        highestBidderId: null,
        activePlayerIndex: prev.currentPlayerIndex,
        passedPlayerIds: [],
        timer: 15
      }
    }));

    addLog(
      'bonus',
      `موزایەدەی ئاشکرا بۆ ${tile.name.ku_sorani} دەستی پێکرد بە نرخی دەستپێکی ${initialBid} دینار! 🏷️`,
      `Muzayede ji bo ${tile.name.ku_kurmanji} dest pê kir!`,
      `Public auction for ${tile.name.en} started with base bid of ${initialBid} IQD! 🏷️`
    );
  };

  // Auction Bid
  const handleAuctionBid = (amount: number) => {
    soundEngine.playCashSound();
    setState(prev => {
      if (!prev.auction) return prev;
      const activeP = prev.players[prev.auction.activePlayerIndex];
      const nextIndex = (prev.auction.activePlayerIndex + 1) % prev.players.length;

      return {
        ...prev,
        auction: {
          ...prev.auction,
          currentBid: amount,
          highestBidderId: activeP?.id || null,
          activePlayerIndex: nextIndex
        }
      };
    });
  };

  // Auction Pass
  const handleAuctionPass = () => {
    setState(prev => {
      if (!prev.auction) return prev;
      const activeP = prev.players[prev.auction.activePlayerIndex];
      if (!activeP) return prev;

      const passed = [...prev.auction.passedPlayerIds, activeP.id];
      const eligible = prev.players.filter(p => !p.isBankrupt && !passed.includes(p.id));

      // If only 1 or 0 eligible left, finish auction!
      if (eligible.length <= 1) {
        const winnerId = prev.auction.highestBidderId || (eligible.length === 1 ? eligible[0].id : null);
        const winAmount = prev.auction.currentBid;
        const tileId = prev.auction.tileId;
        const tile = BOARD_TILES.find(t => t.id === tileId);

        if (winnerId && tile) {
          soundEngine.playBuySound();
          const updatedPlayers = prev.players.map(p =>
            p.id === winnerId
              ? {
                  ...p,
                  money: p.money - winAmount,
                  propertiesOwned: [...p.propertiesOwned, tileId]
                }
              : p
          );

          const winPlayer = prev.players.find(p => p.id === winnerId);
          if (winPlayer) {
            addLog(
              'buy',
              `${winPlayer.name} لە موزایەدەدا سەرکەوت و ${tile.name.ku_sorani}ی کڕی بە ${winAmount} دینار! 🏷️`,
              `${winPlayer.name} di muzayedeyê de ${tile.name.ku_kurmanji} bi ${winAmount} dînar kirî!`,
              `${winPlayer.name} won the auction for ${tile.name.en} at ${winAmount} IQD! 🏷️`,
              winPlayer.id
            );
          }

          return {
            ...prev,
            players: updatedPlayers,
            auction: null,
            phase: 'idle'
          };
        }

        return {
          ...prev,
          auction: null,
          phase: 'idle'
        };
      }

      // Move to next eligible player
      let nextIdx = (prev.auction.activePlayerIndex + 1) % prev.players.length;
      while (
        prev.players[nextIdx].isBankrupt ||
        passed.includes(prev.players[nextIdx].id)
      ) {
        nextIdx = (nextIdx + 1) % prev.players.length;
      }

      return {
        ...prev,
        auction: {
          ...prev.auction,
          passedPlayerIds: passed,
          activePlayerIndex: nextIdx
        }
      };
    });
  };

  // Trade Proposal
  const handleProposeTrade = (offerData: Omit<TradeOffer, 'id' | 'status'>) => {
    setIsTradeOpen(false);
    const receiver = state.players.find(p => p.id === offerData.receiverId);
    const sender = state.players.find(p => p.id === offerData.senderId);
    if (!receiver || !sender) return;

    const offer: TradeOffer = {
      id: `trade_${Date.now()}`,
      ...offerData,
      status: 'pending'
    };

    // If receiver is AI, AI evaluates immediately!
    if (receiver.isAI) {
      const accepted = evaluateAITradeOffer(receiver, offer, state);
      if (accepted) {
        soundEngine.playBuySound();
        setState(prev => {
          const updatedPlayers = prev.players.map(p => {
            if (p.id === sender.id) {
              return {
                ...p,
                money: p.money - offer.offeredMoney + offer.requestedMoney,
                propertiesOwned: [
                  ...p.propertiesOwned.filter(id => !offer.offeredProperties.includes(id)),
                  ...offer.requestedProperties
                ]
              };
            }
            if (p.id === receiver.id) {
              return {
                ...p,
                money: p.money + offer.offeredMoney - offer.requestedMoney,
                propertiesOwned: [
                  ...p.propertiesOwned.filter(id => !offer.requestedProperties.includes(id)),
                  ...offer.offeredProperties
                ]
              };
            }
            return p;
          });

          addLog(
            'trade',
            `مامەڵەی بازرگانی لە نێوان ${sender.name} و ${receiver.name} بە سەرکەوتوویی قبووڵ کرا! 🤝`,
            `Danûstandina di navbera ${sender.name} û ${receiver.name} de hate pejirandin! 🤝`,
            `Trade agreement between ${sender.name} and ${receiver.name} was successfully completed! 🤝`
          );

          return { ...prev, players: updatedPlayers };
        });
      } else {
        soundEngine.playTaxSound();
        addLog(
          'trade',
          `${receiver.name} پێشنیاری مامەڵەکەی ڕەتکردەوە چونکە لە قازانجی نەبوو.`,
          `${receiver.name} pêşniyara bazirganiyê red kir.`,
          `${receiver.name} declined the trade offer.`
        );
      }
    }
  };

  // Autonomous AI turn automation loop
  useEffect(() => {
    if (inSetup || state.phase === 'game_over' || state.winnerId) return;

    const player = state.players[state.currentPlayerIndex];
    if (!player || !player.isAI || player.isBankrupt) return;

    if (aiActionTimerRef.current) {
      clearTimeout(aiActionTimerRef.current);
    }

    aiActionTimerRef.current = setTimeout(() => {
      // Step 1: In Jail decision
      if (player.inJail && !state.hasRolled) {
        if (player.hasGetOutOfJailCard > 0) {
          handleUseJailCard();
          return;
        }
        if (player.money >= 300) {
          handlePayBail();
          return;
        }
        handleRollDice();
        return;
      }

      // Step 2: Roll dice if not rolled
      if (!state.hasRolled && !state.isRolling) {
        handleRollDice();
        return;
      }

      // Step 3: Handle unowned property landing
      if (state.phase === 'tile_action' && state.selectedTileId !== null) {
        const tile = BOARD_TILES.find(t => t.id === state.selectedTileId);
        if (tile && shouldAIBuyProperty(player, tile.id, state)) {
          handleBuyProperty(tile.id);
        } else {
          setState(prev => ({ ...prev, phase: 'idle' }));
        }
        return;
      }

      // Step 4: Build houses on monopolies if optimal
      const bestBuildId = getAIBestBuildMove(player);
      if (bestBuildId !== null) {
        handleBuildHouse(bestBuildId);
        return;
      }

      // Step 5: End turn
      if (state.hasRolled && state.phase === 'idle') {
        handleEndTurn();
      }
    }, 1200);

    return () => {
      if (aiActionTimerRef.current) {
        clearTimeout(aiActionTimerRef.current);
      }
    };
  }, [
    state.currentPlayerIndex,
    state.hasRolled,
    state.isRolling,
    state.phase,
    state.selectedTileId,
    state.players,
    inSetup,
    state.winnerId,
    handleRollDice,
    handleEndTurn,
    handlePayBail,
    handleUseJailCard,
    state
  ]);

  // AI Auction Auto-Bidding Loop
  useEffect(() => {
    if (!state.auction) return;
    const activeP = state.players[state.auction.activePlayerIndex];
    if (!activeP || !activeP.isAI) return;

    const timer = setTimeout(() => {
      const bid = getAIAuctionBid(activeP, state.auction!.tileId, state.auction!.currentBid);
      if (bid) {
        handleAuctionBid(bid);
      } else {
        handleAuctionPass();
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [state.auction, state.players]);

  if (inSetup) {
    return (
      <SetupScreen
        onStartGame={handleStartGame}
        onResumeGame={handleResumeGame}
        hasSavedGame={hasSavedGame}
        initialSettings={state.settings}
      />
    );
  }

  const selectedTile = state.selectedTileId !== null ? BOARD_TILES.find(t => t.id === state.selectedTileId) || null : null;
  const isTileSelectedCurrentLanding = currentPlayer ? currentPlayer.position === state.selectedTileId : false;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* Top Header */}
      <GameHeader
        language={state.settings.language}
        turnCount={state.turnCount}
        soundEnabled={state.settings.soundEnabled}
        musicEnabled={state.settings.musicEnabled}
        onToggleSound={() =>
          setState(prev => ({
            ...prev,
            settings: { ...prev.settings, soundEnabled: !prev.settings.soundEnabled }
          }))
        }
        onToggleMusic={() =>
          setState(prev => ({
            ...prev,
            settings: { ...prev.settings, musicEnabled: !prev.settings.musicEnabled }
          }))
        }
        onLanguageChange={lang =>
          setState(prev => ({
            ...prev,
            settings: { ...prev.settings, language: lang }
          }))
        }
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenLogs={() => setIsLogsOpen(true)}
        onNewGame={() => {
          clearSavedGameState();
          setInSetup(true);
        }}
      />

      {/* Players Horizontal Status Carousel */}
      <PlayerStatsBar
        players={state.players}
        currentPlayerIndex={state.currentPlayerIndex}
        language={state.settings.language}
        onPlayerClick={p => {
          if (p.id === currentPlayer?.id) {
            setIsManageOpen(true);
          }
        }}
      />

      {/* Main Board Center Stage */}
      <main className="flex-1 flex items-center justify-center p-1 sm:p-2 overflow-y-auto">
        <Board
          state={state}
          language={state.settings.language}
          onTileClick={tile => setState(prev => ({ ...prev, selectedTileId: tile.id }))}
          onRollDice={handleRollDice}
          onOpenTrade={() => setIsTradeOpen(true)}
          onOpenManage={() => setIsManageOpen(true)}
          onOpenSeyranWheel={() => setIsSeyranWheelOpen(true)}
        />
      </main>

      {/* Bottom Action Controls */}
      {currentPlayer && (
        <ActionControls
          state={state}
          currentPlayer={currentPlayer}
          currentTile={currentTile}
          language={state.settings.language}
          onRollDice={handleRollDice}
          onEndTurn={handleEndTurn}
          onBuyProperty={() => handleBuyProperty(currentTile.id)}
          onStartAuction={() => handleStartAuction(currentTile.id)}
          onPayBail={handlePayBail}
          onUseJailCard={handleUseJailCard}
          onDeclareBankruptcy={() => handleDeclareBankruptcy(currentPlayer.id)}
        />
      )}

      {/* Property Details Modal */}
      {selectedTile && (
        <PropertyModal
          tile={selectedTile}
          players={state.players}
          currentPlayer={currentPlayer || state.players[0]}
          language={state.settings.language}
          onClose={() => setState(prev => ({ ...prev, selectedTileId: null }))}
          onBuy={handleBuyProperty}
          onAuction={handleStartAuction}
          onBuild={handleBuildHouse}
          onSellBuilding={handleSellBuilding}
          onMortgage={handleMortgage}
          onUnmortgage={handleUnmortgage}
          canBuyHere={isTileSelectedCurrentLanding && state.hasRolled && state.phase === 'tile_action'}
        />
      )}

      {/* Trade Modal */}
      {isTradeOpen && currentPlayer && (
        <TradeModal
          currentPlayer={currentPlayer}
          players={state.players}
          language={state.settings.language}
          onProposeTrade={handleProposeTrade}
          onClose={() => setIsTradeOpen(false)}
        />
      )}

      {/* Manage Properties Modal */}
      {isManageOpen && currentPlayer && (
        <ManagePropertiesModal
          player={currentPlayer}
          language={state.settings.language}
          onClose={() => setIsManageOpen(false)}
          onBuild={handleBuildHouse}
          onSellBuilding={handleSellBuilding}
          onMortgage={handleMortgage}
          onUnmortgage={handleUnmortgage}
        />
      )}

      {/* Card Draw Modal */}
      {state.activeCard && (
        <CardDrawModal
          card={state.activeCard}
          language={state.settings.language}
          onConfirm={() => executeCardAction(state.activeCard)}
        />
      )}

      {/* Seyran Picnic Wheel Modal */}
      {isSeyranWheelOpen && (
        <SeyranWheelModal
          jackpotAmount={state.jackpot}
          language={state.settings.language}
          onCollectPot={() => {
            if (currentPlayer && state.jackpot > 0) {
              const pot = state.jackpot;
              setState(prev => ({
                ...prev,
                players: prev.players.map(p =>
                  p.id === currentPlayer.id ? { ...p, money: p.money + pot } : p
                ),
                jackpot: 100
              }));
              addLog(
                'seyran',
                `${currentPlayer.name} پاشەکەوتی باجەکانی وەرگرت بە بڕی ${pot} دینار! 🌸`,
                `${currentPlayer.name} ${pot} dînar ji jackpota Seyranê wergirt!`,
                `${currentPlayer.name} collected ${pot} IQD from the Seyran pot! 🌸`,
                currentPlayer.id
              );
            }
          }}
          onClose={() => setIsSeyranWheelOpen(false)}
          onBonusReward={(amount, label) => {
            if (currentPlayer) {
              setState(prev => ({
                ...prev,
                players: prev.players.map(p =>
                  p.id === currentPlayer.id ? { ...p, money: p.money + amount } : p
                )
              }));
              addLog(
                'bonus',
                `${currentPlayer.name} خەڵاتی ${label}ی بەدەستهێنا (+${amount} دینار)! ✨`,
                `${currentPlayer.name} xelata ${label} wergirt (+${amount} dînar)!`,
                `${currentPlayer.name} won the ${label} bonus prize (+${amount} IQD)! ✨`,
                currentPlayer.id
              );
            }
          }}
        />
      )}

      {/* Auction Modal */}
      {state.auction && (
        <AuctionModal
          auction={state.auction}
          players={state.players}
          language={state.settings.language}
          onBid={handleAuctionBid}
          onPass={handleAuctionPass}
        />
      )}

      {/* Game Logs Modal */}
      <GameLog
        logs={state.logs}
        language={state.settings.language}
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
      />

      {/* Game Rules Modal */}
      {isRulesOpen && (
        <RulesModal
          language={state.settings.language}
          onClose={() => setIsRulesOpen(false)}
        />
      )}

      {/* Game Over Victory Modal */}
      {state.phase === 'game_over' && state.winnerId && (
        <GameOverModal
          winner={state.players.find(p => p.id === state.winnerId) || state.players[0]}
          players={state.players}
          language={state.settings.language}
          onPlayAgain={() => {
            clearSavedGameState();
            setInSetup(true);
          }}
        />
      )}
    </div>
  );
};

export default App;
