export type TileType =
  | 'property'
  | 'railroad'
  | 'utility'
  | 'start'
  | 'jail'
  | 'seyran' // Free parking / Kurdish picnic
  | 'go_to_jail'
  | 'tax'
  | 'chance' // بەختی خۆت
  | 'chest'; // خەزێنەی گشتی

export type PropertyGroup =
  | 'brown'
  | 'light_blue'
  | 'pink'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'
  | 'dark_blue'
  | 'transport'
  | 'utility';

export interface BoardTile {
  id: number;
  name: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  city?: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  type: TileType;
  group?: PropertyGroup;
  price?: number;
  rent?: number[]; // [base, 1 house, 2 houses, 3 houses, 4 houses, hotel/villa]
  houseCost?: number;
  mortgageValue?: number;
  taxAmount?: number;
  taxPercentage?: number;
  image?: string;
  description?: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  icon?: string;
}

export type TokenId = 'lion' | 'eagle' | 'samovar' | 'citadel' | 'saz' | 'klash' | 'sun';

export interface PlayerToken {
  id: TokenId;
  name: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  emoji: string;
  color: string;
  bgColor: string;
  borderCol: string;
}

export interface Player {
  id: string;
  name: string;
  isAI: boolean;
  token: TokenId;
  color: string;
  money: number;
  position: number;
  inJail: boolean;
  jailTurns: number;
  hasGetOutOfJailCard: number;
  isBankrupt: boolean;
  propertiesOwned: number[]; // Tile IDs
  buildings: Record<number, number>; // Tile ID -> house count (0-4 = houses, 5 = hotel/villa)
  mortgaged: Record<number, boolean>; // Tile ID -> boolean
  totalRounds: number;
}

export type Language = 'ku_sorani' | 'ku_kurmanji' | 'en';

export interface GameCard {
  id: string;
  type: 'chance' | 'chest';
  title: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  text: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  action:
    | 'collect'
    | 'pay'
    | 'move_to'
    | 'go_to_jail'
    | 'get_out_of_jail'
    | 'pay_repairs'
    | 'collect_from_all'
    | 'pay_to_all'
    | 'move_steps';
  amount?: number;
  houseCost?: number;
  hotelCost?: number;
  targetPosition?: number;
  steps?: number;
  icon?: string;
}

export interface TradeOffer {
  id: string;
  senderId: string;
  receiverId: string;
  offeredMoney: number;
  offeredProperties: number[];
  requestedMoney: number;
  requestedProperties: number[];
  status: 'pending' | 'accepted' | 'rejected';
}

export interface AuctionState {
  tileId: number;
  currentBid: number;
  highestBidderId: string | null;
  activePlayerIndex: number;
  passedPlayerIds: string[];
  timer: number;
}

export interface GameLogEntry {
  id: string;
  timestamp: string;
  type: 'dice' | 'buy' | 'rent' | 'tax' | 'card' | 'jail' | 'seyran' | 'trade' | 'build' | 'mortgage' | 'bankrupt' | 'bonus';
  message: {
    ku_sorani: string;
    ku_kurmanji: string;
    en: string;
  };
  playerId?: string;
}

export interface GameSettings {
  language: Language;
  startingMoney: number;
  fastMode: boolean;
  seyranJackpotEnabled: boolean;
  auctionEnabled: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  dice: [number, number];
  isRolling: boolean;
  hasRolled: boolean;
  doubleCount: number;
  jackpot: number;
  phase: 'idle' | 'rolling' | 'tile_action' | 'auction' | 'card_drawn' | 'game_over';
  activeCard: GameCard | null;
  auction: AuctionState | null;
  pendingTrade: TradeOffer | null;
  selectedTileId: number | null;
  logs: GameLogEntry[];
  winnerId: string | null;
  turnCount: number;
  settings: GameSettings;
}
