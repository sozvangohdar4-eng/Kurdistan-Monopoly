import { Player, GameState, TradeOffer } from '../types/game';
import { BOARD_TILES, GROUP_MEMBERS } from '../data/boardData';

export function shouldAIBuyProperty(ai: Player, tileId: number, state: GameState): boolean {
  const tile = BOARD_TILES.find(t => t.id === tileId);
  if (!tile || !tile.price) return false;

  // If AI can afford it with some safety cushion (or if it's very cheap)
  const remainingCash = ai.money - tile.price;
  if (remainingCash < 50 && tile.price > 100) return false;

  // Check if this property completes a monopoly for AI
  if (tile.group) {
    const groupTiles = GROUP_MEMBERS[tile.group] || [];
    const ownedByAI = groupTiles.filter(id => ai.propertiesOwned.includes(id)).length;
    if (ownedByAI === groupTiles.length - 1) {
      // Completes monopoly! Always buy if can afford
      return ai.money >= tile.price;
    }

    // Check if it blocks an opponent from completing a monopoly
    for (const player of state.players) {
      if (player.id !== ai.id && !player.isBankrupt) {
        const opponentOwns = groupTiles.filter(id => player.propertiesOwned.includes(id)).length;
        if (opponentOwns === groupTiles.length - 1) {
          // Urgent block!
          return ai.money >= tile.price;
        }
      }
    }
  }

  // General rule: buy if remaining cash >= 80
  return remainingCash >= 60;
}

export function evaluateAITradeOffer(ai: Player, offer: TradeOffer, state: GameState): boolean {
  let offerValueToAI = offer.offeredMoney;
  let requestValueFromAI = offer.requestedMoney;

  // Value of properties AI would receive
  for (const propId of offer.offeredProperties) {
    const tile = BOARD_TILES.find(t => t.id === propId);
    if (!tile || !tile.price) continue;
    let propVal = tile.price * 1.1;

    // Check if completing monopoly for AI
    if (tile.group) {
      const groupTiles = GROUP_MEMBERS[tile.group] || [];
      const owned = groupTiles.filter(id => ai.propertiesOwned.includes(id)).length;
      if (owned === groupTiles.length - 1) {
        propVal *= 2.5; // Huge bonus!
      }
    }
    offerValueToAI += propVal;
  }

  // Value of properties AI would give away
  for (const propId of offer.requestedProperties) {
    const tile = BOARD_TILES.find(t => t.id === propId);
    if (!tile || !tile.price) continue;
    let propVal = tile.price * 1.2;

    if (tile.group) {
      const groupTiles = GROUP_MEMBERS[tile.group] || [];
      const owned = groupTiles.filter(id => ai.propertiesOwned.includes(id)).length;
      // If giving away part of an existing monopoly or near monopoly
      if (owned === groupTiles.length) {
        propVal *= 3.0; // AI rarely breaks own monopoly
      } else if (owned === groupTiles.length - 1) {
        propVal *= 2.0;
      }

      // Check if giving it completes opponent's monopoly
      const sender = state.players.find(p => p.id === offer.senderId);
      if (sender) {
        const senderOwns = groupTiles.filter(id => sender.propertiesOwned.includes(id)).length;
        if (senderOwns === groupTiles.length - 1) {
          propVal *= 2.2;
        }
      }
    }
    requestValueFromAI += propVal;
  }

  return offerValueToAI >= requestValueFromAI * 0.95;
}

export function getAIBestBuildMove(ai: Player): number | null {
  // Find all completed monopolies owned by AI
  const monopolies: number[] = [];

  Object.entries(GROUP_MEMBERS).forEach(([groupKey, tileIds]) => {
    if (groupKey === 'transport' || groupKey === 'utility') return;
    const ownsAll = tileIds.every(id => ai.propertiesOwned.includes(id));
    if (ownsAll) {
      monopolies.push(...tileIds);
    }
  });

  if (monopolies.length === 0) return null;

  // Filter properties with less than 5 buildings (5 = hotel/villa) and not mortgaged
  const buildable = monopolies.filter(id => {
    const count = ai.buildings[id] || 0;
    const isMortgaged = ai.mortgaged[id];
    const tile = BOARD_TILES.find(t => t.id === id);
    const cost = tile?.houseCost || 100;
    return count < 5 && !isMortgaged && ai.money >= cost + 120; // Keep safety cushion
  });

  if (buildable.length === 0) return null;

  // Find lowest building count in group to build evenly
  buildable.sort((a, b) => {
    const countA = ai.buildings[a] || 0;
    const countB = ai.buildings[b] || 0;
    return countA - countB;
  });

  return buildable[0];
}

export function getAIAuctionBid(ai: Player, tileId: number, currentBid: number): number | null {
  const tile = BOARD_TILES.find(t => t.id === tileId);
  if (!tile || !tile.price) return null;

  let maxBid = tile.price * 1.1;

  // Check monopoly priority
  if (tile.group) {
    const groupTiles = GROUP_MEMBERS[tile.group] || [];
    const owned = groupTiles.filter(id => ai.propertiesOwned.includes(id)).length;
    if (owned === groupTiles.length - 1) {
      maxBid = tile.price * 1.8;
    }
  }

  const nextBid = currentBid + 10;
  if (nextBid <= maxBid && ai.money >= nextBid + 50) {
    return nextBid;
  }
  return null;
}
