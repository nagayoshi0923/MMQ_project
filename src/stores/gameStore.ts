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
  initializeGame: (roomId: string, scenarioId: string) => void;
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
    (set) => ({
      gameState: null,
      isConnected: false,

      initializeGame: (roomId, scenarioId) => {
        // デモ用のキャラクターデータを初期化
        const demoCharacters: Character[] = [
          {
            id: 'char-1',
            name: '田中太郎',
            role: '容疑者A',
            description: '被害者の隣人。普段は穏やかな性格だが、最近被害者とトラブルがあった。',
            alibi: '事件発生時は自宅でテレビを見ていたと主張している。',
            motive: '被害者との騒音トラブルで激しい口論があった。',
            isRevealed: false
          },
          {
            id: 'char-2',
            name: '佐藤花子',
            role: '容疑者B',
            description: '被害者の友人。最近被害者と金銭トラブルがあった。',
            alibi: '事件発生時は友人と電話で話していたと主張している。',
            motive: '被害者に多額の借金があり、返済を迫られていた。',
            isRevealed: false
          },
          {
            id: 'char-3',
            name: '鈴木一郎',
            role: '容疑者C',
            description: '被害者の同僚。職場での昇進を巡って対立していた。',
            alibi: '事件発生時は職場で残業していたと主張している。',
            motive: '昇進の座を巡って被害者と激しく対立していた。',
            isRevealed: false
          },
          {
            id: 'char-4',
            name: '山田美咲',
            role: '被害者の妻',
            description: '被害者の妻。最近夫との関係が冷え込んでいた。',
            alibi: '事件発生時は実家に帰っていたと主張している。',
            motive: '夫の浮気を疑っており、離婚を考えていた。',
            isRevealed: false
          },
          {
            id: 'char-5',
            name: '高橋健一',
            role: '元同僚',
            description: '被害者の元同僚。リストラで恨みを持っている。',
            alibi: '事件発生時は自宅で一人で過ごしていたと主張している。',
            motive: '被害者によってリストラされ、生活が困窮していた。',
            isRevealed: false
          },
          {
            id: 'char-6',
            name: '小林刑事',
            role: '刑事',
            description: '事件を担当する刑事。冷静で的確な推理力を持つ。',
            alibi: '事件発生時は警察署にいた。',
            motive: '事件の真相を解明することが使命。',
            isRevealed: false
          }
        ];

        const gameState: GameState = {
          id: `game_${Date.now()}`,
          roomId,
          scenarioId,
          phase: 'overview',
          timeRemaining: 300, // 5分
          maxTime: 300,
          isPaused: false,
          evidence: [],
          characters: demoCharacters,
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
