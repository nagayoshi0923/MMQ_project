import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore, GamePhase } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';

interface GamePhaseManagerProps {
  className?: string;
}

const phaseConfig = {
  overview: {
    title: '事件概要',
    description: '事件の詳細を確認してください',
    duration: 300, // 5分
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20'
  },
  investigation: {
    title: '捜査フェーズ',
    description: '証拠を集めて事件を調査してください',
    duration: 600, // 10分
    color: 'text-green-400',
    bgColor: 'bg-green-900/20'
  },
  discussion: {
    title: '議論フェーズ',
    description: '他のプレイヤーと議論して情報を共有してください',
    duration: 900, // 15分
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20'
  },
  voting: {
    title: '投票フェーズ',
    description: '容疑者に投票してください',
    duration: 180, // 3分
    color: 'text-red-400',
    bgColor: 'bg-red-900/20'
  },
  results: {
    title: '結果発表',
    description: '事件の真相が明らかになります',
    duration: 0,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20'
  }
};

const GamePhaseManager: React.FC<GamePhaseManagerProps> = ({ className }) => {
  const { gameState, setPhase, updateTimer, pauseGame, resumeGame } = useGameStore();
  const { user } = useAuthStore();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // ホスト権限の確認（簡易版）
    setIsHost(user?.id === 'demo-host' || user?.id === 'demo1');
  }, [user]);

  useEffect(() => {
    if (!gameState || gameState.isPaused) return;

    const interval = setInterval(() => {
      if (gameState.timeRemaining > 0) {
        updateTimer(gameState.timeRemaining - 1);
      } else {
        // 時間切れで次のフェーズへ
        const phases: GamePhase[] = ['overview', 'investigation', 'discussion', 'voting', 'results'];
        const currentIndex = phases.indexOf(gameState.phase);
        
        if (currentIndex < phases.length - 1) {
          const nextPhase = phases[currentIndex + 1];
          setPhase(nextPhase);
          updateTimer(phaseConfig[nextPhase].duration);
        } else {
          // ゲーム終了
          pauseGame();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, setPhase, updateTimer, pauseGame]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNextPhase = () => {
    if (!gameState || !isHost) return;

    const phases: GamePhase[] = ['overview', 'investigation', 'discussion', 'voting', 'results'];
    const currentIndex = phases.indexOf(gameState.phase);
    
    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      setPhase(nextPhase);
      updateTimer(phaseConfig[nextPhase].duration);
    }
  };

  const handlePauseResume = () => {
    if (!gameState || !isHost) return;

    if (gameState.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  if (!gameState) return null;

  const config = phaseConfig[gameState.phase];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className={config.color}>
            {config.title}
          </span>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
              {formatTime(gameState.timeRemaining)}
            </div>
            {isHost && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePauseResume}
                >
                  {gameState.isPaused ? '再開' : '一時停止'}
                </Button>
                {gameState.phase !== 'results' && (
                  <Button
                    size="sm"
                    onClick={handleNextPhase}
                  >
                    次へ
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-mystery-300 text-sm">
          {config.description}
        </p>
        
        {/* フェーズ進行状況 */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-mystery-400 mb-2">
            <span>フェーズ進行状況</span>
            <span>{Math.round(((phaseConfig[gameState.phase].duration - gameState.timeRemaining) / phaseConfig[gameState.phase].duration) * 100)}%</span>
          </div>
          <div className="w-full bg-mystery-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${config.bgColor}`}
              style={{ 
                width: `${Math.min(100, ((phaseConfig[gameState.phase].duration - gameState.timeRemaining) / phaseConfig[gameState.phase].duration) * 100)}%` 
              }}
            />
          </div>
        </div>

        {/* フェーズ一覧 */}
        <div className="mt-4 flex gap-2">
          {Object.entries(phaseConfig).map(([phase, config]) => (
            <div
              key={phase}
              className={`px-2 py-1 rounded text-xs ${
                gameState.phase === phase 
                  ? `${config.bgColor} ${config.color} font-medium` 
                  : 'bg-mystery-700 text-mystery-400'
              }`}
            >
              {config.title}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamePhaseManager;
