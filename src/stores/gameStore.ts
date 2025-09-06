import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GamePhase = 'overview' | 'investigation' | 'discussion' | 'voting' | 'results';

export interface Evidence {
  id: string;
  name: string;
  description: string;
  location: string;
  discoveredBy?: string;
  discoveredAt?: Date;
  isRevealed: boolean;
  category: 'physical' | 'testimony' | 'document' | 'digital';
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  alibi: string;
  motive: string;
  isRevealed: boolean;
  assignedTo?: string; // プレイヤーID
}

export interface Vote {
  voterId: string;
  voterName: string;
  targetId: string;
  targetName: string;
  timestamp: Date;
}

export interface GameState {
  id: string;
  roomId: string;
  scenarioId: string;
  phase: GamePhase;
  timeRemaining: number; // 秒
  maxTime: number; // 秒
  isPaused: boolean;
  evidence: Evidence[];
  characters: Character[];
  votes: Vote[];
  currentPlayerId?: string;
  gameStartedAt?: Date;
  gameEndedAt?: Date;
}

interface GameStore {
  gameState: GameState | null;
  isConnected: boolean;
  
  // Actions
  initializeGame: (roomId: string, scenarioId: string, players: any[]) => void;
  setPhase: (phase: GamePhase) => void;
  updateTimer: (timeRemaining: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  addEvidence: (evidence: Omit<Evidence, 'id' | 'discoveredAt'>) => void;
  revealEvidence: (evidenceId: string) => void;
  assignCharacter: (characterId: string, playerId: string) => void;
  addVote: (vote: Omit<Vote, 'timestamp'>) => void;
  endGame: () => void;
  resetGame: () => void;
  setConnected: (connected: boolean) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: null,
      isConnected: false,

      initializeGame: (roomId, scenarioId, players) => {
        const gameState: GameState = {
          id: `game_${Date.now()}`,
          roomId,
          scenarioId,
          phase: 'overview',
          timeRemaining: 300, // 5分
          maxTime: 300,
          isPaused: false,
          evidence: [],
          characters: [],
          votes: [],
          gameStartedAt: new Date()
        };

        set({ gameState });
      },

      setPhase: (phase) => set((state) => ({
        gameState: state.gameState ? { ...state.gameState, phase } : null
      })),

      updateTimer: (timeRemaining) => set((state) => ({
        gameState: state.gameState ? { ...state.gameState, timeRemaining } : null
      })),

      pauseGame: () => set((state) => ({
        gameState: state.gameState ? { ...state.gameState, isPaused: true } : null
      })),

      resumeGame: () => set((state) => ({
        gameState: state.gameState ? { ...state.gameState, isPaused: false } : null
      })),

      addEvidence: (evidence) => set((state) => {
        if (!state.gameState) return state;
        
        const newEvidence: Evidence = {
          ...evidence,
          id: `evidence_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          discoveredAt: new Date()
        };

        return {
          gameState: {
            ...state.gameState,
            evidence: [...state.gameState.evidence, newEvidence]
          }
        };
      }),

      revealEvidence: (evidenceId) => set((state) => {
        if (!state.gameState) return state;
        
        return {
          gameState: {
            ...state.gameState,
            evidence: state.gameState.evidence.map(e => 
              e.id === evidenceId ? { ...e, isRevealed: true } : e
            )
          }
        };
      }),

      assignCharacter: (characterId, playerId) => set((state) => {
        if (!state.gameState) return state;
        
        return {
          gameState: {
            ...state.gameState,
            characters: state.gameState.characters.map(c => 
              c.id === characterId ? { ...c, assignedTo: playerId } : c
            )
          }
        };
      }),

      addVote: (vote) => set((state) => {
        if (!state.gameState) return state;
        
        const newVote: Vote = {
          ...vote,
          timestamp: new Date()
        };

        // 既存の投票を削除（同じ投票者の場合）
        const filteredVotes = state.gameState.votes.filter(v => v.voterId !== vote.voterId);
        
        return {
          gameState: {
            ...state.gameState,
            votes: [...filteredVotes, newVote]
          }
        };
      }),

      endGame: () => set((state) => ({
        gameState: state.gameState ? { 
          ...state.gameState, 
          gameEndedAt: new Date(),
          isPaused: true 
        } : null
      })),

      resetGame: () => set({ gameState: null }),

      setConnected: (connected) => set({ isConnected: connected })
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        gameState: state.gameState
      })
    }
  )
);
