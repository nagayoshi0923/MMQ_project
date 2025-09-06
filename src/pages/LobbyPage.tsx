import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { demoScenarios, demoGameRoom } from '@/lib/demoData';

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleScenarioClick = (scenarioId: string) => {
    navigate(`/scenario/${scenarioId}`);
  };

  const handleJoinRoom = () => {
    navigate(`/room/${demoGameRoom.id}`);
  };

  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-mystery font-bold text-accent-500">
            ロビー
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-mystery-300">
              ようこそ、{user?.displayName}さん
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              ログアウト
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* シナリオ一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>シナリオ一覧</CardTitle>
              <CardDescription>利用可能なシナリオを選択してください</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoScenarios.map((scenario) => (
                  <Card 
                    key={scenario.id}
                    variant="outlined" 
                    className="p-4 hover:bg-mystery-700/50 transition-colors cursor-pointer"
                    onClick={() => handleScenarioClick(scenario.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-mystery-100">{scenario.title}</h3>
                        <p className="text-sm text-mystery-300">
                          {scenario.difficulty === 'beginner' ? '初級' : 
                           scenario.difficulty === 'intermediate' ? '中級' : '上級'} | 
                          {scenario.playerCount}人 | {scenario.estimatedTime}分
                        </p>
                        <p className="text-xs text-mystery-400 mt-1">{scenario.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        詳細 →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ゲームルーム一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>ゲームルーム</CardTitle>
              <CardDescription>参加可能なルームまたは新しいルームを作成</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Card variant="outlined" className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-mystery-100">{demoGameRoom.name}</h3>
                      <p className="text-sm text-mystery-300">
                        マンション事件 | 4/6人 | 待機中
                      </p>
                      <p className="text-xs text-mystery-400 mt-1">
                        ルームコード: {demoGameRoom.roomCode}
                      </p>
                    </div>
                    <Button 
                      className="mt-2" 
                      size="sm"
                      onClick={handleJoinRoom}
                    >
                      参加
                    </Button>
                  </div>
                </Card>
              </div>
              <Button variant="secondary" className="w-full mt-4" disabled>
                新しいルームを作成（未実装）
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
