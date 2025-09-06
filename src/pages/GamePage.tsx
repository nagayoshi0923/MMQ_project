import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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

const GamePage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentRoom } = useGameRoomStore();
  const { gameState, initializeGame, resetGame } = useGameStore();

  // ゲーム初期化
  useEffect(() => {
    if (!roomId || !user || !currentRoom) return;

    // デモ用のゲーム初期化
    const scenario = demoScenarios.find(s => s.id === currentRoom.scenarioId);
    if (scenario) {
      initializeGame(roomId, currentRoom.scenarioId, currentRoom.currentPlayers);
    }

    return () => {
      resetGame();
    };
  }, [roomId, user, currentRoom, initializeGame, resetGame]);

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
            ゲーム画面
          </h1>
          <div className="flex items-center gap-4">
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
