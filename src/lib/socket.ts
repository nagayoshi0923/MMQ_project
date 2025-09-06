import { io, Socket } from 'socket.io-client';

// WebSocket接続の管理クラス
class SocketManager {
  private socket: Socket | null = null;
  private isConnected = false;

  // サーバーに接続
  connect(roomId: string, userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // 開発環境では localhost:3001 を使用
        const serverUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
        
        this.socket = io(serverUrl, {
          auth: {
            roomId,
            userId,
          },
          transports: ['websocket', 'polling'],
        });

        this.socket.on('connect', () => {
          console.log('WebSocket接続成功:', this.socket?.id);
          this.isConnected = true;
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.error('WebSocket接続エラー:', error);
          reject(error);
        });

        this.socket.on('disconnect', (reason) => {
          console.log('WebSocket切断:', reason);
          this.isConnected = false;
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  // サーバーから切断
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // 接続状態を取得
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // イベントリスナーを追加
  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // イベントリスナーを削除
  off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // サーバーにイベントを送信
  emit(event: string, data?: any): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('WebSocket未接続のため、イベント送信をスキップ:', event);
    }
  }

  // ルームに参加
  joinRoom(roomId: string, userId: string): void {
    this.emit('join_room', { roomId, userId });
  }

  // ルームから退出
  leaveRoom(roomId: string, userId: string): void {
    this.emit('leave_room', { roomId, userId });
  }

  // ゲーム状態を送信
  sendGameState(gameState: any): void {
    this.emit('game_state_update', gameState);
  }

  // チャットメッセージを送信
  sendChatMessage(message: string, userId: string, userName: string): void {
    this.emit('chat_message', {
      message,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  }

  // 投票を送信
  sendVote(voterId: string, targetId: string): void {
    this.emit('vote', { voterId, targetId });
  }

  // 証拠を送信
  sendEvidence(evidence: any): void {
    this.emit('evidence_add', evidence);
  }

  // ゲームフェーズを送信
  sendPhaseChange(phase: string): void {
    this.emit('phase_change', { phase });
  }
}

// シングルトンインスタンス
export const socketManager = new SocketManager();

// 型定義
export interface SocketEvents {
  // サーバーから受信するイベント
  game_state_updated: (gameState: any) => void;
  chat_message_received: (message: any) => void;
  player_joined: (player: any) => void;
  player_left: (playerId: string) => void;
  vote_received: (vote: any) => void;
  evidence_added: (evidence: any) => void;
  phase_changed: (phase: string) => void;
  error: (error: string) => void;
}

export default socketManager;
