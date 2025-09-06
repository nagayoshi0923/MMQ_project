import { useEffect, useRef, useState } from 'react';
import { socketManager, SocketEvents } from '@/lib/socket';

// WebSocket接続を管理するカスタムフック
export const useSocket = (roomId: string, userId: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const isConnecting = useRef(false);

  // 接続を確立
  const connect = async () => {
    if (isConnecting.current || isConnected) return;
    
    isConnecting.current = true;
    setConnectionError(null);

    try {
      await socketManager.connect(roomId, userId);
      setIsConnected(true);
      socketManager.joinRoom(roomId, userId);
    } catch (error) {
      console.error('WebSocket接続失敗:', error);
      setConnectionError(error instanceof Error ? error.message : '接続に失敗しました');
    } finally {
      isConnecting.current = false;
    }
  };

  // 切断
  const disconnect = () => {
    if (roomId && userId) {
      socketManager.leaveRoom(roomId, userId);
    }
    socketManager.disconnect();
    setIsConnected(false);
    setConnectionError(null);
  };

  // イベントリスナーを設定
  const on = <K extends keyof SocketEvents>(
    event: K,
    callback: SocketEvents[K]
  ) => {
    socketManager.on(event, callback);
  };

  // イベントリスナーを削除
  const off = <K extends keyof SocketEvents>(
    event: K,
    callback?: SocketEvents[K]
  ) => {
    socketManager.off(event, callback);
  };

  // イベントを送信
  const emit = (event: string, data?: any) => {
    socketManager.emit(event, data);
  };

  // コンポーネントマウント時に接続
  useEffect(() => {
    if (roomId && userId) {
      connect();
    }

    // クリーンアップ
    return () => {
      disconnect();
    };
  }, [roomId, userId]);

  // 接続状態の監視
  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(socketManager.getConnectionStatus());
    };

    const interval = setInterval(checkConnection, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    connectionError,
    connect,
    disconnect,
    on,
    off,
    emit,
    // 便利なメソッド
    sendChatMessage: (message: string, userName: string) => {
      socketManager.sendChatMessage(message, userId, userName);
    },
    sendVote: (targetId: string) => {
      socketManager.sendVote(userId, targetId);
    },
    sendEvidence: (evidence: any) => {
      socketManager.sendEvidence(evidence);
    },
    sendGameState: (gameState: any) => {
      socketManager.sendGameState(gameState);
    },
    sendPhaseChange: (phase: string) => {
      socketManager.sendPhaseChange(phase);
    },
  };
};

export default useSocket;
