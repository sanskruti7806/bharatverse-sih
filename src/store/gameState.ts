import { create } from 'zustand';

export type NodeType = 'monument' | 'knowledge' | 'craft' | 'trade' | 'music' | 'science' | 'arts';

export type Element = {
  id: string;
  name: string;
  type: NodeType;
  lat: number;
  lng: number;
  region: string;
  era: string;
  description: string;
  historicalContext: string;
  dnaInfluence: { trait: string; value: number }[];
};

export type Connection = {
  id: string;
  from: string;
  to: string;
  name: string;
  synergyId?: string;
  synergyTitle?: string;
};

export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type InventoryItem = {
  id: string;
  name: string;
  icon: string;
  category: NodeType;
  rarity: ItemRarity;
  era: string;
  source: string;
  description: string;
  historicalContext: string;
  tags: string[];
  placeable: boolean;
  isPlaced: boolean;
  targetSlotId?: string;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  earnedAt: string;
};

export type Synergy = {
  id: string;
  title: string;
  description: string;
  nodeA: string;
  nodeB: string;
  bonusDNA: { trait: keyof HeritageDNA; value: number }[];
  bonusXP: number;
};

export interface HeritageDNA {
  architecture: number;
  strategy: number;
  history: number;
  geography: number;
  arts: number;
  mathematics: number;
}

export type WorldSlot = {
  id: string;
  name: string;
  region: string;
  era: string;
  lat: number;
  lng: number;
  status: 'unlocked' | 'available' | 'locked';
  accepts: NodeType;
  historicalContext: string;
  recommendedQuest?: string;
};

// Known Cultural Synergies between Heritage Elements
export const KNOWN_SYNERGIES: Synergy[] = [
  {
    id: 'syn_nalanda_trade',
    title: 'Knowledge Exchange Route',
    description: 'Ancient monastic universities were sustained and disseminated globally along caravan trade networks.',
    nodeA: 'nalanda_token',
    nodeB: 'trade_route_1',
    bonusDNA: [{ trait: 'strategy', value: 15 }, { trait: 'geography', value: 15 }],
    bonusXP: 200
  },
  {
    id: 'syn_nalanda_aryabhata',
    title: 'Vedic Astronomical Nexus',
    description: 'Nalanda was a vital center for preserving and expanding the mathematical astronomical works of Aryabhata.',
    nodeA: 'nalanda_token',
    nodeB: 'aryabhatiya_scroll',
    bonusDNA: [{ trait: 'mathematics', value: 20 }, { trait: 'history', value: 15 }],
    bonusXP: 250
  },
  {
    id: 'syn_nalanda_natya',
    title: 'Aesthetic Heritage Union',
    description: 'Harmonizes theoretical and aesthetic texts, demonstrating ancient holistic learning traditions.',
    nodeA: 'nalanda_token',
    nodeB: 'natyashastra_folio',
    bonusDNA: [{ trait: 'arts', value: 20 }, { trait: 'architecture', value: 15 }],
    bonusXP: 250
  }
];

export const WORLD_SLOTS: WorldSlot[] = [
  {
    id: 'magadha',
    name: 'Nalanda Mahavihara',
    region: 'Magadha (Bihar)',
    era: '5th - 12th Century CE',
    lat: 25.1333,
    lng: 85.4419,
    status: 'unlocked',
    accepts: 'monument',
    historicalContext: 'Ancient world-renowned Buddhist monastic university that attracted thousands of international seekers.'
  },
  {
    id: 'trade',
    name: 'Silk Route Gateway',
    region: 'Central Plains (Madhya Pradesh)',
    era: '3rd Century BCE',
    lat: 23.4833,
    lng: 77.7333,
    status: 'unlocked',
    accepts: 'trade',
    historicalContext: 'Historic crossroads connecting the northern trade routes (Uttarapatha) to central India.'
  },
  {
    id: 'sanchi',
    name: 'Sanchi Stupa Complex',
    region: 'Raisen (Madhya Pradesh)',
    era: '3rd Century BCE - 12th Century CE',
    lat: 23.4793,
    lng: 77.7397,
    status: 'available',
    accepts: 'monument',
    historicalContext: 'Magnificent Buddhist stupas with intricately carved toranas depicting Jataka tales.'
  },
  {
    id: 'ajanta',
    name: 'Ajanta Cave Sanctuaries',
    region: 'Maharashtra',
    era: '2nd Century BCE - 6th Century CE',
    lat: 20.5519,
    lng: 75.7033,
    status: 'locked',
    accepts: 'arts',
    historicalContext: 'Monolithic rock-cut cave temples famous for ancient Indian murals and frescoes.',
    recommendedQuest: 'Echoes of Ajanta'
  },
  {
    id: 'hampi',
    name: 'Hampi (Vijayanagara)',
    region: 'Karnataka',
    era: '14th - 16th Century CE',
    lat: 15.3350,
    lng: 76.4600,
    status: 'locked',
    accepts: 'monument',
    historicalContext: 'Grand capital of the Vijayanagara Empire known for stunning Dravidian architecture and vibrant bazaars.',
    recommendedQuest: 'Citadel of Tungabhadra'
  },
  {
    id: 'dholavira',
    name: 'Dholavira Waterworks',
    region: 'Kutch (Gujarat)',
    era: '3000 - 1500 BCE',
    lat: 23.8860,
    lng: 70.2170,
    status: 'locked',
    accepts: 'science',
    historicalContext: 'Harappan metropolis known for the worlds most advanced ancient stepwells and hydraulic engineering.',
    recommendedQuest: 'The Harappan Reservoirs'
  },
  {
    id: 'chola_port',
    name: 'Chola Maritime Port (Poompuhar)',
    region: 'Coromandel Coast (Tamil Nadu)',
    era: '10th - 12th Century CE',
    lat: 11.1444,
    lng: 79.8544,
    status: 'locked',
    accepts: 'trade',
    historicalContext: 'Hub of oceanic trade fleets navigating the Bay of Bengal to Southeast Asian kingdoms.',
    recommendedQuest: 'The Chola Maritime World'
  }
];

export interface PlayerProfile {
  name: string;
  title: string;
  level: number;
  xp: number;
  nextLevelXP: number;
}

interface GameState {
  hasSeenIntro: boolean;
  setHasSeenIntro: (val: boolean) => void;

  player: PlayerProfile;
  addXP: (amount: number) => { leveledUp: boolean; newLevel: number };
  levelUpNotification: { oldLevel: number; newLevel: number; title: string } | null;
  dismissLevelUp: () => void;

  placedNodes: Element[];
  placeNode: (node: Element) => boolean;

  connections: Connection[];
  addConnection: (fromId: string, toId: string) => { success: boolean; message: string; synergy?: Synergy };

  discoveredSynergies: Synergy[];

  inventory: InventoryItem[];
  addToInventory: (item: InventoryItem) => void;
  markPlaced: (id: string) => void;

  heritageDNA: HeritageDNA;
  updateDNA: (trait: keyof HeritageDNA, val: number) => void;

  completedQuests: string[];
  activeQuest: string | null;
  questProgress: Record<string, number>;
  unlockedLocations: string[];
  unlockedEras: string[];
  unlockedGames: string[];
  completeQuest: (questId: string, rewards: { xp: number; dnaDeltas: Partial<HeritageDNA>; badge?: Badge; item?: InventoryItem }) => void;

  badges: Badge[];
  choices: Record<string, string>;
  recordChoice: (choiceKey: string, choiceValue: string) => void;

  flyToTarget: [number, number] | null;
  setFlyToTarget: (coords: [number, number] | null) => void;

  bannerMessage: string | null;
  setBannerMessage: (msg: string | null) => void;
}

const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Novice Seeker' },
  { level: 2, xp: 500, title: 'Seeker of Vidya' },
  { level: 3, xp: 1200, title: 'Nalanda Upasaka' },
  { level: 4, xp: 2000, title: 'Heritage Scholar' },
  { level: 5, xp: 3200, title: 'Grand Acharya' },
];

function calculateLevel(xp: number): { level: number; title: string; nextLevelXP: number } {
  let currentTier = LEVEL_THRESHOLDS[0];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      currentTier = LEVEL_THRESHOLDS[i];
      const nextTier = LEVEL_THRESHOLDS[i + 1];
      return {
        level: currentTier.level,
        title: currentTier.title,
        nextLevelXP: nextTier ? nextTier.xp : currentTier.xp + 1500
      };
    }
  }
  return { level: 1, title: 'Novice Seeker', nextLevelXP: 500 };
}

export const useGameStore = create<GameState>((set, get) => ({
  hasSeenIntro: false,
  setHasSeenIntro: (val) => set({ hasSeenIntro: val }),

  player: {
    name: 'Explorer',
    title: 'Novice Seeker',
    level: 1,
    xp: 0,
    nextLevelXP: 500,
  },

  levelUpNotification: null,
  dismissLevelUp: () => set({ levelUpNotification: null }),

  addXP: (amount: number) => {
    const state = get();
    const newXP = state.player.xp + Math.max(0, amount);
    const prevLevel = state.player.level;
    const { level: newLevel, title: newTitle, nextLevelXP } = calculateLevel(newXP);

    const leveledUp = newLevel > prevLevel;

    set({
      player: {
        ...state.player,
        xp: newXP,
        level: newLevel,
        title: newTitle,
        nextLevelXP,
      },
      levelUpNotification: leveledUp
        ? { oldLevel: prevLevel, newLevel, title: newTitle }
        : state.levelUpNotification,
    });

    return { leveledUp, newLevel };
  },

  placedNodes: [],
  placeNode: (node: Element) => {
    const state = get();
    if (state.placedNodes.some((n) => n.id === node.id)) {
      return false;
    }
    set({ placedNodes: [...state.placedNodes, node] });
    return true;
  },

  connections: [],
  discoveredSynergies: [],

  addConnection: (fromId: string, toId: string) => {
    const state = get();
    if (fromId === toId) {
      return { success: false, message: 'A node cannot connect to itself.' };
    }

    // Normalized pair comparison: stable order
    const [normA, normB] = fromId < toId ? [fromId, toId] : [toId, fromId];
    const connectionId = `conn_${normA}_${normB}`;

    if (state.connections.some((c) => c.id === connectionId)) {
      return { success: false, message: 'Connection already discovered.' };
    }

    const nodeA = state.placedNodes.find((n) => n.id === fromId);
    const nodeB = state.placedNodes.find((n) => n.id === toId);

    if (!nodeA || !nodeB) {
      return { success: false, message: 'Invalid node selection.' };
    }

    // Check for known cultural synergy
    const matchingSynergy = KNOWN_SYNERGIES.find(
      (s) =>
        (s.nodeA === normA && s.nodeB === normB) ||
        (s.nodeA === normB && s.nodeB === normA)
    );

    const newConn: Connection = {
      id: connectionId,
      from: fromId,
      to: toId,
      name: matchingSynergy ? matchingSynergy.title : `Sangam: ${nodeA.name} & ${nodeB.name}`,
      synergyId: matchingSynergy?.id,
      synergyTitle: matchingSynergy?.title,
    };

    const newConnections = [...state.connections, newConn];
    let newSynergies = state.discoveredSynergies;

    if (matchingSynergy && !state.discoveredSynergies.some((s) => s.id === matchingSynergy.id)) {
      newSynergies = [...state.discoveredSynergies, matchingSynergy];
      // Grant synergy bonus XP & DNA safely
      get().addXP(matchingSynergy.bonusXP);
      matchingSynergy.bonusDNA.forEach((d) => {
        get().updateDNA(d.trait, d.value);
      });
    } else {
      // Standard connection bonus
      get().addXP(50);
      get().updateDNA('strategy', 5);
      get().updateDNA('history', 5);
    }

    set({
      connections: newConnections,
      discoveredSynergies: newSynergies,
    });

    return {
      success: true,
      message: matchingSynergy ? `Synergy Unlocked: ${matchingSynergy.title}` : 'Sangam formed successfully.',
      synergy: matchingSynergy,
    };
  },

  // Starting inventory: Empty unexplored India with 1 tutorial item labeled clearly
  inventory: [
    {
      id: 'trade_route_1',
      name: 'Uttarapatha Trade Fragment',
      icon: '🗺️',
      category: 'trade',
      rarity: 'Common',
      era: 'Ancient (3rd Century BCE)',
      source: 'Tutorial Discovery',
      description: 'A parchment map fragment depicting northern commercial trade networks linking Magadha to Taxila.',
      historicalContext: 'The Uttarapatha was ancient Indias great northern trade artery along which goods, languages, and philosophies traveled.',
      tags: ['Trade', 'Geography', 'Routes'],
      placeable: true,
      isPlaced: false,
      targetSlotId: 'trade',
    }
  ],

  addToInventory: (item: InventoryItem) => {
    set((state) => {
      if (state.inventory.some((i) => i.id === item.id)) {
        return state;
      }
      return { inventory: [...state.inventory, item] };
    });
  },

  markPlaced: (id: string) =>
    set((state) => ({
      inventory: state.inventory.map((i) => (i.id === id ? { ...i, isPlaced: true } : i)),
    })),

  heritageDNA: {
    architecture: 15,
    strategy: 15,
    history: 15,
    geography: 15,
    arts: 15,
    mathematics: 15,
  },

  // Controlled safe progression: clamped strictly to [0, 100]
  updateDNA: (trait, delta) =>
    set((state) => {
      const current = state.heritageDNA[trait] || 0;
      const clamped = Math.max(0, Math.min(100, current + delta));
      return {
        heritageDNA: {
          ...state.heritageDNA,
          [trait]: clamped,
        },
      };
    }),

  completedQuests: [],
  activeQuest: 'nalanda',
  questProgress: {
    nalanda: 0,
  },
  unlockedLocations: ['magadha', 'trade'],
  unlockedEras: ['Ancient India (5th - 7th Century CE)'],
  unlockedGames: ['ashtapada'],

  completeQuest: (questId, rewards) => {
    const state = get();
    if (state.completedQuests.includes(questId)) return;

    // Award XP
    get().addXP(rewards.xp);

    // Update DNA traits
    if (rewards.dnaDeltas) {
      Object.entries(rewards.dnaDeltas).forEach(([trait, delta]) => {
        if (delta) {
          get().updateDNA(trait as keyof HeritageDNA, delta);
        }
      });
    }

    // Add badge
    const newBadges = rewards.badge
      ? [...state.badges.filter((b) => b.id !== rewards.badge!.id), rewards.badge]
      : state.badges;

    // Add inventory item if present
    let newInventory = state.inventory;
    if (rewards.item && !state.inventory.some((i) => i.id === rewards.item!.id)) {
      newInventory = [...state.inventory, rewards.item];
    }

    // If Nalanda is completed, unlock Nalanda token & next locations
    const newLocations = [...state.unlockedLocations];
    if (questId === 'nalanda') {
      if (!newLocations.includes('sanchi')) newLocations.push('sanchi');
      if (!newLocations.includes('chola_port')) newLocations.push('chola_port');
    }

    set({
      completedQuests: [...state.completedQuests, questId],
      activeQuest: questId === 'nalanda' ? 'chola' : null,
      questProgress: { ...state.questProgress, [questId]: 100 },
      unlockedLocations: newLocations,
      badges: newBadges,
      inventory: newInventory,
    });
  },

  badges: [],
  choices: {},
  recordChoice: (choiceKey, choiceValue) =>
    set((state) => ({
      choices: { ...state.choices, [choiceKey]: choiceValue },
    })),

  flyToTarget: null,
  setFlyToTarget: (target) => set({ flyToTarget: target }),

  bannerMessage: null,
  setBannerMessage: (msg) => set({ bannerMessage: msg }),
}));
