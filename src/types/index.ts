// 基本的な型定義
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  createdAt: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  playerCount: number;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: {
    characters: Character[];
    timeline: Event[];
    clues: Clue[];
  };
  isPublic: boolean;
  tags: string[];
  creatorId: string;
  createdAt: Date;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  role: string;
  isSuspect: boolean;
  alibi?: string;
  motive?: string;
}

export interface Event {
  id: string;
  time: string;
  description: string;
  location: string;
  involvedCharacters: string[];
}

export interface Clue {
  id: string;
  name: string;
  description: string;
  location: string;
  type: 'physical' | 'testimony' | 'document';
  importance: 'low' | 'medium' | 'high';
  relatedCharacters: string[];
}

export interface GameRoom {
  id: string;
  name: string;
  roomCode: string;
  scenarioId: string;
  hostId: string;
  maxPlayers: number;
  isPrivate: boolean;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: Date;
}

export interface Player {
  id: string;
  userId: string;
  roomId: string;
  username: string;
  displayName: string;
  isReady: boolean;
  isHost: boolean;
  joinedAt: Date;
}

export interface GameState {
  phase: 'overview' | 'investigation' | 'discussion' | 'voting' | 'conclusion';
  currentPhase: string;
  timeRemaining: number;
  players: Player[];
  collectedClues: Clue[];
  votes: Vote[];
  isGameActive: boolean;
}

export interface Vote {
  id: string;
  voterId: string;
  suspectId: string;
  timestamp: Date;
}

// 認証関連の型
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ゲーム関連の型
export interface GameStore {
  currentRoom: GameRoom | null;
  gameState: GameState | null;
  scenarios: Scenario[];
  isLoading: boolean;
  error: string | null;
}

// API レスポンスの型
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// フォーム関連の型
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
}

export interface CreateRoomForm {
  name: string;
  scenarioId: string;
  maxPlayers: number;
  isPrivate: boolean;
}
