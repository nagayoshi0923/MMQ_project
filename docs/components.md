# コンポーネント仕様書

## 概要

Murder Mystery PlatformのReactコンポーネント仕様書です。

## 実装状況

- ✅ **実装済み** - 完全に実装され、動作確認済み
- 🚧 **実装中** - 部分的に実装済み、開発中
- ❌ **未実装** - まだ実装されていない
- 🔄 **要修正** - 実装済みだが修正が必要

## UIコンポーネント

### Button ✅
基本的なボタンコンポーネント

**Props**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
```

**使用例**
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  クリック
</Button>
```

### Input ✅
フォーム入力コンポーネント

**Props**
```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  // HTMLInputElementの全プロパティを継承
}
```

### Card ✅
カードコンポーネント

**Props**
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
```

### LoadingSpinner ✅
ローディング表示コンポーネント

**Props**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}
```

### AnimatedCard ✅
アニメーション付きカードコンポーネント

**Props**
```typescript
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounce';
  hover?: boolean;
}
```

### AnimatedButton ✅
アニメーション付きボタンコンポーネント

**Props**
```typescript
interface AnimatedButtonProps extends ButtonProps {
  animation?: 'pulse' | 'bounce' | 'shake' | 'glow' | 'none';
  delay?: number;
  duration?: number;
}
```

## ゲームコンポーネント

### GamePhaseManager ✅
ゲームフェーズ管理コンポーネント

**Props**
```typescript
interface GamePhaseManagerProps {
  className?: string;
}
```

**機能**
- ゲームフェーズの表示
- タイマー表示
- フェーズ進行管理

### EvidencePanel ✅
証拠管理パネルコンポーネント

**Props**
```typescript
interface EvidencePanelProps {
  className?: string;
}
```

**機能**
- 証拠の表示
- 証拠の追加
- 証拠の公開

### VotingPanel ✅
投票パネルコンポーネント

**Props**
```typescript
interface VotingPanelProps {
  className?: string;
}
```

**機能**
- 投票対象の表示
- 投票実行
- 投票結果表示

### CharacterAssignment ✅
キャラクター割り当てコンポーネント

**Props**
```typescript
interface CharacterAssignmentProps {
  className?: string;
}
```

**機能**
- キャラクター一覧表示
- キャラクター選択
- 割り当て状態管理

### Chat ✅
チャットコンポーネント

**Props**
```typescript
interface ChatProps {
  className?: string;
}
```

**機能**
- メッセージ表示
- メッセージ送信
- リアルタイム更新

### PlayerList ✅
プレイヤー一覧コンポーネント

**Props**
```typescript
interface PlayerListProps {
  className?: string;
}
```

**機能**
- プレイヤー一覧表示
- 準備状態表示
- プレイヤー情報管理

## 認証コンポーネント

### AuthGuard ✅
認証ガードコンポーネント

**Props**
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**機能**
- 認証状態の確認
- 未認証時のリダイレクト
- 認証エラーの処理

## ページコンポーネント

### LoginPage ✅
ログインページ

**機能**
- デモログイン
- 直接ゲーム開始
- 新規登録リンク

### RegisterPage ✅
新規登録ページ

**機能**
- ユーザー登録フォーム
- バリデーション
- エラーハンドリング

### LobbyPage ✅
ロビーページ

**機能**
- シナリオ選択
- ルーム一覧表示
- ルーム参加

### ScenarioPage ✅
シナリオ詳細ページ

**機能**
- シナリオ詳細表示
- ルーム作成
- シナリオ選択

### GameRoomPage ✅
ゲームルームページ

**機能**
- プレイヤー管理
- ゲーム開始
- チャット機能

### GamePage ✅
ゲームページ

**機能**
- ゲーム進行管理
- 証拠管理
- 投票システム
- リアルタイム通信

## カスタムフック

### useSocket ✅
WebSocket接続管理フック

**戻り値**
```typescript
interface UseSocketReturn {
  isConnected: boolean;
  connectionError: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  on: <K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) => void;
  off: <K extends keyof SocketEvents>(event: K, callback?: SocketEvents[K]) => void;
  emit: (event: string, data?: any) => void;
  sendChatMessage: (message: string, userName: string) => void;
  sendVote: (targetId: string) => void;
  sendEvidence: (evidence: any) => void;
  sendGameState: (gameState: any) => void;
  sendPhaseChange: (phase: string) => void;
}
```

## 状態管理

### useAuthStore ✅
認証状態管理

**状態**
```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
```

**アクション**
- `login(user: User)`
- `logout()`
- `clearError()`

### useGameRoomStore ✅
ゲームルーム状態管理

**状態**
```typescript
interface GameRoomState {
  currentRoom: GameRoom | null;
  chatMessages: ChatMessage[];
  isConnected: boolean;
}
```

**アクション**
- `setCurrentRoom(room: GameRoom)`
- `addPlayer(player: Player)`
- `removePlayer(playerId: string)`
- `updatePlayerReady(playerId: string, isReady: boolean)`
- `addChatMessage(message: ChatMessage)`
- `startGame()`
- `leaveRoom()`

### useGameStore ✅
ゲーム状態管理

**状態**
```typescript
interface GameStore {
  gameState: GameState | null;
  isConnected: boolean;
}
```

**アクション**
- `initializeGame(roomId: string, scenarioId: string, players: any[])`
- `setPhase(phase: GamePhase)`
- `updateTimer(timeRemaining: number)`
- `pauseGame()`
- `resumeGame()`
- `addEvidence(evidence: Evidence)`
- `revealEvidence(evidenceId: string)`
- `assignCharacter(characterId: string, playerId: string)`
- `addVote(vote: Vote)`
- `endGame()`
- `resetGame()`

## 型定義

### 基本型
```typescript
interface User {
  id: string;
  displayName: string;
  email: string;
}

interface GameRoom {
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

interface Player {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  characterId?: string;
  joinedAt: Date;
}

interface GameState {
  id: string;
  roomId: string;
  scenarioId: string;
  phase: GamePhase;
  timeRemaining: number;
  maxTime: number;
  isPaused: boolean;
  evidence: Evidence[];
  characters: Character[];
  votes: Vote[];
  gameStartedAt?: Date;
  gameEndedAt?: Date;
}

type GamePhase = 'overview' | 'investigation' | 'discussion' | 'voting' | 'results';
```

## スタイリング

### カラーパレット
```css
/* メインカラー */
--mystery-900: #0f172a;
--mystery-800: #1e293b;
--mystery-700: #334155;
--mystery-600: #475569;
--mystery-500: #64748b;
--mystery-400: #94a3b8;
--mystery-300: #cbd5e1;
--mystery-200: #e2e8f0;
--mystery-100: #f1f5f9;

/* アクセントカラー */
--accent-500: #f59e0b;
--accent-600: #d97706;
--accent-700: #b45309;
```

### フォント
- **メインフォント**: Inter
- **装飾フォント**: Cinzel (ミステリー感のあるタイトル用)

## アニメーション

### フェードイン
```typescript
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};
```

### スライドアップ
```typescript
const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
```

### バウンス
```typescript
const bounceVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};
```
