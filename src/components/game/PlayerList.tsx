import React from 'react';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameRoomStore, Player } from '@/stores/gameRoomStore';
import { useAuthStore } from '@/stores/authStore';

interface PlayerListProps {
  className?: string;
}

const PlayerList: React.FC<PlayerListProps> = ({ className }) => {
  const { currentRoom, updatePlayerReady } = useGameRoomStore();
  const { user } = useAuthStore();

  if (!currentRoom) return null;

  const handleToggleReady = () => {
    if (!user) return;
    
    const player = currentRoom.currentPlayers.find(p => p.id === user.id);
    if (player) {
      updatePlayerReady(user.id, !player.isReady);
    }
  };

  const getReadyStatus = (player: Player) => {
    if (player.isReady) {
      return { text: '準備完了', color: 'text-green-400' };
    }
    return { text: '準備中', color: 'text-yellow-400' };
  };

  const isCurrentUser = (player: Player) => {
    return user?.id === player.id;
  };

  const canStartGame = () => {
    const readyPlayers = currentRoom.currentPlayers.filter(p => p.isReady);
    return readyPlayers.length >= 2 && readyPlayers.length === currentRoom.currentPlayers.length;
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-mystery-100">
          プレイヤー ({currentRoom.currentPlayers.length}/{currentRoom.maxPlayers}人)
        </h3>
        {isCurrentUser(currentRoom.currentPlayers[0]) && (
          <span className="text-sm text-accent-400 font-medium">
            ホスト
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        {currentRoom.currentPlayers.map((player) => {
          const status = getReadyStatus(player);
          const isUser = isCurrentUser(player);
          
          return (
            <Card 
              key={player.id} 
              variant="outlined" 
              className={`p-3 ${isUser ? 'ring-2 ring-accent-500/50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-mystery-100 font-medium">
                    {player.name}
                    {player.isHost && (
                      <span className="ml-2 text-xs bg-accent-500 text-mystery-900 px-2 py-1 rounded">
                        ホスト
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.text}
                  </span>
                  {isUser && !player.isHost && (
                    <Button
                      size="sm"
                      variant={player.isReady ? "secondary" : "primary"}
                      onClick={handleToggleReady}
                    >
                      {player.isReady ? '準備解除' : '準備完了'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        
        {/* 空のスロット表示 */}
        {Array.from({ length: currentRoom.maxPlayers - currentRoom.currentPlayers.length }).map((_, index) => (
          <Card key={`empty-${index}`} variant="outlined" className="p-3 opacity-50">
            <div className="flex items-center justify-between">
              <span className="text-mystery-400">空きスロット</span>
              <span className="text-mystery-500 text-sm">待機中</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ゲーム開始条件 */}
      <div className="mt-4 p-3 bg-mystery-800 rounded-lg">
        <div className="text-sm text-mystery-300">
          <p className="mb-1">
            ゲーム開始条件: 最低2人、全員準備完了
          </p>
          <p className={`font-medium ${
            canStartGame() ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {canStartGame() 
              ? 'ゲーム開始可能です！' 
              : `あと${2 - currentRoom.currentPlayers.length}人以上必要です`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
