# API仕様書

## 概要

Murder Mystery PlatformのAPI仕様書です。

## 実装状況

- ✅ **実装済み** - 完全に実装され、動作確認済み
- 🚧 **実装中** - 部分的に実装済み、開発中
- ❌ **未実装** - まだ実装されていない
- 🔄 **要修正** - 実装済みだが修正が必要

**注意**: 現在はデモモードでの実装のため、実際のAPIエンドポイントは未実装です。フロントエンド側でデモデータを使用して動作しています。

## 認証API

### ログイン ❌
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**レスポンス**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "displayName": "string",
    "email": "string"
  },
  "token": "string"
}
```

### ログアウト ❌
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## ゲームルームAPI

### ルーム一覧取得 ❌
```http
GET /api/rooms
```

**レスポンス**
```json
{
  "success": true,
  "rooms": [
    {
      "id": "string",
      "name": "string",
      "roomCode": "string",
      "scenarioId": "string",
      "maxPlayers": 6,
      "currentPlayers": 4,
      "isGameStarted": false,
      "createdAt": "string"
    }
  ]
}
```

### ルーム作成 ❌
```http
POST /api/rooms
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "string",
  "scenarioId": "string",
  "maxPlayers": 6
}
```

### ルーム参加 ❌
```http
POST /api/rooms/{roomId}/join
Authorization: Bearer <token>
```

### ルーム退出 ❌
```http
POST /api/rooms/{roomId}/leave
Authorization: Bearer <token>
```

## ゲームAPI

### ゲーム開始 ❌
```http
POST /api/games/{roomId}/start
Authorization: Bearer <token>
```

### ゲーム状態取得 ❌
```http
GET /api/games/{roomId}/state
Authorization: Bearer <token>
```

**レスポンス**
```json
{
  "success": true,
  "gameState": {
    "id": "string",
    "roomId": "string",
    "scenarioId": "string",
    "phase": "overview|investigation|discussion|voting|results",
    "timeRemaining": 300,
    "maxTime": 300,
    "isPaused": false,
    "evidence": [],
    "characters": [],
    "votes": [],
    "gameStartedAt": "string"
  }
}
```

### フェーズ変更 ❌
```http
POST /api/games/{roomId}/phase
Content-Type: application/json
Authorization: Bearer <token>

{
  "phase": "overview|investigation|discussion|voting|results"
}
```

### 証拠追加 ❌
```http
POST /api/games/{roomId}/evidence
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "string",
  "description": "string",
  "category": "physical|testimony|document|digital",
  "discoveredBy": "string"
}
```

### 投票 ❌
```http
POST /api/games/{roomId}/vote
Content-Type: application/json
Authorization: Bearer <token>

{
  "targetId": "string"
}
```

## WebSocket API

### 接続 🚧
```javascript
const socket = io('ws://localhost:3001', {
  auth: {
    roomId: 'string',
    userId: 'string'
  }
});
```

### イベント 🚧

#### サーバーからクライアント
- `game_state_updated` - ゲーム状態更新
- `chat_message_received` - チャットメッセージ受信
- `player_joined` - プレイヤー参加
- `player_left` - プレイヤー退出
- `vote_received` - 投票受信
- `evidence_added` - 証拠追加
- `phase_changed` - フェーズ変更
- `error` - エラー

#### クライアントからサーバー
- `join_room` - ルーム参加
- `leave_room` - ルーム退出
- `game_state_update` - ゲーム状態送信
- `chat_message` - チャットメッセージ送信
- `vote` - 投票送信
- `evidence_add` - 証拠送信
- `phase_change` - フェーズ変更送信

## エラーレスポンス ❌

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### エラーコード
- `UNAUTHORIZED` - 認証エラー
- `FORBIDDEN` - 権限エラー
- `NOT_FOUND` - リソースが見つからない
- `VALIDATION_ERROR` - バリデーションエラー
- `GAME_NOT_STARTED` - ゲームが開始されていない
- `INVALID_PHASE` - 無効なフェーズ
- `ROOM_FULL` - ルームが満員
- `ALREADY_VOTED` - 既に投票済み

## 認証 ❌

APIリクエストにはJWTトークンが必要です。トークンはAuthorizationヘッダーに含めて送信してください。

```http
Authorization: Bearer <your-jwt-token>
```

## レート制限 ❌

- 認証API: 10回/分
- ゲームAPI: 100回/分
- WebSocket: 制限なし

## バージョニング ❌

APIのバージョンはURLパスに含まれます。

```
/api/v1/...
```

現在のバージョン: v1
