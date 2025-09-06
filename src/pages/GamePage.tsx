import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useGameStore } from '@/stores/gameStore';
import { useGameRoomStore } from '@/stores/gameRoomStore';
import { useAuthStore } from '@/stores/authStore';
import { demoScenarios } from '@/lib/demoData';
import GamePhaseManager from '@/components/game/GamePhaseManager';
import EvidencePanel from '@/components/game/EvidencePanel';
import VotingPanel from '@/components/game/VotingPanel';
import CharacterAssignment from '@/components/game/CharacterAssignment';
import Chat from '@/components/game/Chat';
import { useSocket } from '@/hooks/useSocket';

const GamePage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentRoom } = useGameRoomStore();
  const { gameState, initializeGame, resetGame } = useGameStore();
  
  // WebSocket接続
  const { 
    isConnected, 
    connectionError, 
    on, 
    off, 
    sendGameState
  } = useSocket(roomId || '', user?.id || '');

  // ゲーム初期化
  useEffect(() => {
    console.log('GamePage初期化チェック:', { roomId, user: !!user, currentRoom: !!currentRoom });
    
    if (!roomId || !user) {
      console.log('基本条件が満たされていません:', { roomId, user: !!user });
      return;
    }

    // currentRoomがnullの場合はデモ用のルームデータを作成
    let roomData = currentRoom;
    if (!roomData) {
      console.log('currentRoomがnullのため、デモ用ルームデータを作成します');
      const { setCurrentRoom } = useGameRoomStore.getState();
      roomData = {
        id: roomId,
        name: 'デモルーム',
        roomCode: 'DEMO123',
        scenarioId: 'scenario-1',
        maxPlayers: 6,
        currentPlayers: [
          {
            id: user.id,
            name: user.displayName,
            isHost: true,
            isReady: true,
            joinedAt: new Date()
          }
        ],
        isGameStarted: true,
        createdAt: new Date(),
        hostId: user.id
      };
      setCurrentRoom(roomData);
    }

    // デモ用のゲーム初期化
    const scenario = demoScenarios.find(s => s.id === roomData.scenarioId);
    console.log('シナリオ検索結果:', { scenarioId: roomData.scenarioId, scenario: !!scenario });
    
    if (scenario) {
      console.log('ゲーム初期化を実行します');
      initializeGame(roomId, roomData.scenarioId);
    } else {
      console.log('シナリオが見つかりません');
    }

    return () => {
      resetGame();
    };
  }, [roomId, user, currentRoom, initializeGame, resetGame]);

  // WebSocketイベントリスナーの設定（デモモードでは無効）
  useEffect(() => {
    if (!isConnected) return;

    // ゲーム状態の同期
    const handleGameStateUpdate = (newGameState: any) => {
      // サーバーからの状態更新を処理
      console.log('ゲーム状態更新を受信:', newGameState);
    };

    // フェーズ変更の同期
    const handlePhaseChange = (phase: string) => {
      console.log('フェーズ変更を受信:', phase);
    };

    // エラーハンドリング
    const handleError = (error: string) => {
      console.error('WebSocketエラー:', error);
    };

    // イベントリスナーを登録
    on('game_state_updated', handleGameStateUpdate);
    on('phase_changed', handlePhaseChange);
    on('error', handleError);

    // クリーンアップ
    return () => {
      off('game_state_updated', handleGameStateUpdate);
      off('phase_changed', handlePhaseChange);
      off('error', handleError);
    };
  }, [isConnected, on, off]);

  // ゲーム状態の変更をサーバーに送信（デモモードでは無効）
  useEffect(() => {
    if (isConnected && gameState) {
      sendGameState(gameState);
    }
  }, [isConnected, gameState, sendGameState]);

  const handleExitGame = () => {
    resetGame();
    navigate('/lobby');
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-mystery-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent>
            <h2 className="text-xl font-bold text-accent-500 mb-4">ゲームを読み込み中...</h2>
            <div className="text-sm text-mystery-400 space-y-2">
              <p>デバッグ情報:</p>
              <p>roomId: {roomId || 'なし'}</p>
              <p>user: {user ? 'ログイン済み' : '未ログイン'}</p>
              <p>currentRoom: {currentRoom ? 'あり' : 'なし'}</p>
              <p>WebSocket: {isConnected ? '接続中' : '切断中'}</p>
              {connectionError && <p className="text-red-400">エラー: {connectionError}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const scenario = demoScenarios.find(s => s.id === gameState.scenarioId);

  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-mystery font-bold text-accent-500">
            🎮 ゲーム画面
          </h1>
          <div className="flex items-center gap-4">
            {/* 接続状態表示 */}
            <div className={`text-sm px-3 py-1 rounded-full ${
              isConnected 
                ? 'text-green-300 bg-green-800' 
                : process.env.NODE_ENV === 'development'
                ? 'text-yellow-300 bg-yellow-800'
                : 'text-red-300 bg-red-800'
            }`}>
              {isConnected ? '🟢 接続中' : process.env.NODE_ENV === 'development' ? '🟡 デモモード' : '🔴 切断中'}
            </div>
            {connectionError && process.env.NODE_ENV !== 'development' && (
              <div className="text-sm text-red-300 bg-red-800 px-3 py-1 rounded-full">
                エラー: {connectionError}
              </div>
            )}
            <div className="text-sm text-mystery-300 bg-mystery-800 px-3 py-1 rounded-full">
              ルーム: {currentRoom?.name || 'Unknown'}
            </div>
            <Button variant="outline" size="sm" onClick={handleExitGame}>
              退出
            </Button>
          </div>
        </div>

        {/* フェーズ管理 */}
        <GamePhaseManager className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* メインゲームエリア */}
          <div className="lg:col-span-3 space-y-6">
            {/* 事件概要 */}
            <Card>
              <CardHeader>
                <CardTitle>事件概要</CardTitle>
                <CardDescription>事件の詳細を確認してください</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-mystery-300 leading-relaxed">
                  {scenario?.description || '事件の詳細が読み込まれていません'}
                </p>
              </CardContent>
            </Card>
            
            {/* 間取り図 */}
            <Card>
              <CardHeader>
                <CardTitle>間取り図</CardTitle>
                <CardDescription>現場の間取り図を確認できます</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-mystery-700 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-mystery-600">
                  <div className="text-center">
                    <span className="text-mystery-400 text-lg">間取り図がここに表示されます</span>
                    <p className="text-mystery-500 text-sm mt-2">ドラッグ・ズーム操作が可能</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 証拠パネル */}
            <EvidencePanel />
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* キャラクター割り当て */}
            <CharacterAssignment />
            
            {/* 投票パネル */}
            <VotingPanel />
            
            {/* チャット */}
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
