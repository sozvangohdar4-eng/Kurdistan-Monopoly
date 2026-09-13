import { GameState, Player } from '../types/game';
import { BOARD_TILES, GROUP_MEMBERS } from '../data/boardData';

const STORAGE_KEY = 'kurdish_monopoly_save_v1';

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save game state', err);
  }
}

export function loadSavedGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSavedGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear saved game state', err);
  }
}

// Calculate total net worth of a player
export function calculateNetWorth(player: Player): number {
  let total = player.money;

  // Add property value
  player.propertiesOwned.forEach(tileId => {
    const tile = BOARD_TILES.find(t => t.id === tileId);
    if (tile?.price) {
      if (player.mortgaged[tileId]) {
        total += (tile.mortgageValue || tile.price / 2);
      } else {
        total += tile.price;
      }
    }
    // Add houses & hotel value
    const buildings = player.buildings[tileId] || 0;
    if (buildings > 0 && tile?.houseCost) {
      total += buildings * tile.houseCost;
    }
  });

  return total;
}

// Check if a player owns a full color group
export function checkHasMonopoly(player: Player, groupKey: string): boolean {
  const members = GROUP_MEMBERS[groupKey as keyof typeof GROUP_MEMBERS] || [];
  if (members.length === 0) return false;
  return members.every(id => player.propertiesOwned.includes(id));
}

// Calculate the rent of a property based on ownership, houses, transport count, utility dice roll
export function calculateRent(
  tileId: number,
  owner: Player,
  diceSum: number = 7
): number {
  const tile = BOARD_TILES.find(t => t.id === tileId);
  if (!tile || !tile.rent) return 0;

  if (owner.mortgaged[tileId]) return 0; // Mortgaged property yields no rent

  // Transport (Railroads / Airports)
  if (tile.type === 'railroad') {
    const transportIds = GROUP_MEMBERS.transport;
    const count = transportIds.filter(id => owner.propertiesOwned.includes(id)).length;
    const rentIdx = Math.max(0, Math.min(count - 1, tile.rent.length - 1));
    return tile.rent[rentIdx] || 25;
  }

  // Utilities (Kormor & Dokan Water)
  if (tile.type === 'utility') {
    const utilityIds = GROUP_MEMBERS.utility;
    const count = utilityIds.filter(id => owner.propertiesOwned.includes(id)).length;
    const multiplier = count >= 2 ? 10 : 4;
    return diceSum * multiplier;
  }

  // Standard Street Property
  const buildingCount = owner.buildings[tileId] || 0;
  if (buildingCount > 0) {
    return tile.rent[buildingCount] || tile.rent[0];
  }

  // Check if monopoly is owned (unimproved doubles base rent)
  if (tile.group && checkHasMonopoly(owner, tile.group)) {
    return (tile.rent[0] || 0) * 2;
  }

  return tile.rent[0] || 0;
}
