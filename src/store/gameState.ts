import { create } from 'zustand';

export type NodeType = 'monument' | 'knowledge' | 'craft' | 'trade' | 'music';
export type Element = {
  id: string;
  name: string;
  type: NodeType;
  lat: number;
  lng: number;
  description: string;
};

export type Connection = {
  id: string;
  from: string;
  to: string;
  name: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  icon: string;
  category: string;
  isPlaced: boolean;
};

interface GameState {
  hasSeenIntro: boolean;
  setHasSeenIntro: (val: boolean) => void;
  
  placedNodes: Element[];
  placeNode: (node: Element) => void;
  
  connections: Connection[];
  addConnection: (conn: Connection) => void;
  
  inventory: InventoryItem[];
  addToInventory: (item: InventoryItem) => void;
  markPlaced: (id: string) => void;
  
  heritageDNA: {
    architecture: number;
    strategy: number;
    history: number;
    geography: number;
    arts: number;
    mathematics: number;
  };
  updateDNA: (trait: keyof GameState['heritageDNA'], val: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  hasSeenIntro: false,
  setHasSeenIntro: (val) => set({ hasSeenIntro: val }),
  
  placedNodes: [],
  placeNode: (node) => set((state) => ({ placedNodes: [...state.placedNodes, node] })),
  
  connections: [],
  addConnection: (conn) => set((state) => ({ connections: [...state.connections, conn] })),
  
  inventory: [
    // Starting items for the demo
    { id: 'nalanda_token', name: 'Nalanda Foundation', icon: '🏛️', category: 'monument', isPlaced: false },
    { id: 'trade_route_1', name: 'Silk Route Branch', icon: '🗺️', category: 'trade', isPlaced: false },
  ],
  addToInventory: (item) => set((state) => ({ inventory: [...state.inventory, item] })),
  markPlaced: (id) => set((state) => ({
    inventory: state.inventory.map(i => i.id === id ? { ...i, isPlaced: true } : i)
  })),
  
  heritageDNA: {
    architecture: 10,
    strategy: 10,
    history: 10,
    geography: 10,
    arts: 10,
    mathematics: 10,
  },
  updateDNA: (trait, val) => set((state) => ({
    heritageDNA: { ...state.heritageDNA, [trait]: state.heritageDNA[trait] + val }
  }))
}));
