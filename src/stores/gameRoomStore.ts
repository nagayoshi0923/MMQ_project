import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  characterId?: string;
  joinedAt: Date;
}

export interface GameRoom {
  id: string;
  name: string;
  roomCode: string;
  scenarioId: string;
  maxPlayers: number;
  currentPlayers: Player[];
  isGameStarted: boolean;
  createdAt: Date;
  hostId: string;
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system';
}

interface GameRoomState {
  currentRoom: GameRoom | null;
  chatMessages: ChatMessage[];
  isConnected: boolean;
  
  // Actions
  setCurrentRoom: (room: GameRoom) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerReady: (playerId: string, isReady: boolean) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  startGame: () => void;
  leaveRoom: () => void;
  setConnected: (connected: boolean) => void;
}

export const useGameRoomStore = create<GameRoomState>()(
  persist(
    (set) => ({
      currentRoom: null,
      chatMessages: [],
      isConnected: false,

      setCurrentRoom: (room) => set({ currentRoom: room }),

      addPlayer: (player) => set((state) => {
        if (!state.currentRoom) return state;
        
        const existingPlayerIndex = state.currentRoom.currentPlayers.findIndex(p => p.id === player.id);
        if (existingPlayerIndex >= 0) {
          // プレイヤーが既に存在する場合は更新
          const updatedPlayers = [...state.currentRoom.currentPlayers];
          updatedPlayers[existingPlayerIndex] = player;
          return {
            currentRoom: {
              ...state.currentRoom,
              currentPlayers: updatedPlayers
            }
          };
        } else {
          // 新しいプレイヤーを追加
          return {
            currentRoom: {
              ...state.currentRoom,
              currentPlayers: [...state.currentRoom.currentPlayers, player]
            }
          };
        }
      }),

      removePlayer: (playerId) => set((state) => {
        if (!state.currentRoom) return state;
        
        return {
          currentRoom: {
            ...state.currentRoom,
            currentPlayers: state.currentRoom.currentPlayers.filter(p => p.id !== playerId)
          }
        };
      }),

      updatePlayerReady: (playerId, isReady) => set((state) => {
        if (!state.currentRoom) return state;
        
        return {
          currentRoom: {
            ...state.currentRoom,
            currentPlayers: state.currentRoom.currentPlayers.map(p => 
              p.id === playerId ? { ...p, isReady } : p
            )
          }
        };
      }),

      addChatMessage: (message) => set((state) => ({
        chatMessages: [
          ...state.chatMessages,
          {
            ...message,
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date()
          }
        ]
      })),

      startGame: () => set((state) => {
        if (!state.currentRoom) return state;
        
        return {
          currentRoom: {
            ...state.currentRoom,
            isGameStarted: true
          }
        };
      }),

      leaveRoom: () => set({
        currentRoom: null,
        chatMessages: [],
        isConnected: false
      }),

      setConnected: (connected) => set({ isConnected: connected })
    }),
    {
      name: 'game-room-storage',
      partialize: (state) => ({
        currentRoom: state.currentRoom,
        chatMessages: state.chatMessages
      })
    }
  )
);
