import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useGameRoomStore } from '@/stores/gameRoomStore';
import { useAuthStore } from '@/stores/authStore';
import { demoGameRoom, demoScenarios } from '@/lib/demoData';
import PlayerList from '@/components/game/PlayerList';
import Chat from '@/components/game/Chat';

const GameRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    currentRoom, 
    setCurrentRoom, 
    addPlayer, 
    leaveRoom, 
    startGame,
    addChatMessage 
  } = useGameRoomStore();
  
  const [maxPlayers, setMaxPlayers] = useState(6);

  // ルーム初期化
  useEffect(() => {
    if (!roomId || !user) return;

    // デモ用のルームデータを設定
    const roomData = {
      ...demoGameRoom,
      id: roomId,
      maxPlayers,
      currentPlayers: [
        {
          id: user.id,
          name: user.displayName,
          isHost: true,
          isReady: false,
          joinedAt: new Date()
        }
      ],
      isGameStarted: false,
      hostId: user.id
    };

    setCurrentRoom(roomData);

    // システムメッセージを追加
    addChatMessage({
      playerId: 'system',
      playerName: 'システム',
      message: `${user.displayName}さんがルームに参加しました`,
      type: 'system'
    });

    // デモ用の他のプレイヤーを追加
    setTimeout(() => {
      const demoPlayers = [
        { id: 'demo1', name: 'プレイヤー2', isHost: false, isReady: true },
        { id: 'demo2', name: 'プレイヤー3', isHost: false, isReady: false },
        { id: 'demo3', name: 'プレイヤー4', isHost: false, isReady: true }
      ];

      demoPlayers.forEach((player, index) => {
        setTimeout(() => {
          addPlayer({
            ...player,
            joinedAt: new Date()
          });
          addChatMessage({
            playerId: 'system',
            playerName: 'システム',
            message: `${player.name}さんがルームに参加しました`,
            type: 'system'
          });
        }, (index + 1) * 1000);
      });
    }, 2000);

    return () => {
      leaveRoom();
    };
  }, [roomId, user, maxPlayers, setCurrentRoom, addPlayer, addChatMessage, leaveRoom]);

  const handleStartGame = () => {
    if (!currentRoom) return;
    
    const readyPlayers = currentRoom.currentPlayers.filter(p => p.isReady);
    if (readyPlayers.length < 2) {
      alert('最低2人のプレイヤーが必要です');
      return;
    }

    if (readyPlayers.length !== currentRoom.currentPlayers.length) {
      alert('全員の準備が完了していません');
      return;
    }

    startGame();
    addChatMessage({
      playerId: 'system',
      playerName: 'システム',
      message: 'ゲームを開始します！',
      type: 'system'
    });
    
    navigate(`/game/${roomId}`);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate('/lobby');
  };

  if (!currentRoom) {
    return (
      <div className="min-h-screen bg-mystery-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent>
            <h2 className="text-xl font-bold text-accent-500 mb-4">ルームを読み込み中...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  const scenario = demoScenarios.find(s => s.id === currentRoom.scenarioId);

  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-mystery font-bold text-accent-500">
            ゲームルーム
          </h1>
          <Link to="/lobby">
            <Button variant="outline" size="sm">
              ← ロビーに戻る
            </Button>
          </Link>
        </div>
        
        {/* ルーム情報 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>ルーム情報</CardTitle>
              <span className="text-sm text-mystery-300 bg-mystery-700 px-3 py-1 rounded-full">
                ルームコード: {currentRoom.roomCode}
              </span>
            </div>
            <CardDescription>
              プレイヤーが集まったらゲームを開始できます
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ルーム設定 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-mystery-100">ルーム設定</h3>
                <div className="space-y-4">
                  <Input
                    label="シナリオ"
                    value={scenario?.title || '不明'}
                    readOnly
                    helperText="シナリオは変更できません"
                  />
                  <div>
                    <label className="block text-sm font-medium text-mystery-300 mb-2">
                      最大プレイヤー数
                    </label>
                    <select 
                      value={maxPlayers}
                      onChange={(e) => setMaxPlayers(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-mystery-800 border border-mystery-600 rounded-lg text-mystery-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value={4}>4人</option>
                      <option value={6}>6人</option>
                      <option value={8}>8人</option>
                      <option value={10}>10人</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ゲーム開始ボタン */}
              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleStartGame}
                    disabled={currentRoom.currentPlayers.length < 2}
                  >
                    ゲーム開始
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    size="lg"
                    onClick={handleLeaveRoom}
                  >
                    ルームを退出
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* プレイヤー一覧とチャット */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlayerList />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default GameRoomPage;
