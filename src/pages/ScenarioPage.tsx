import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { demoScenarios, demoGameRoom } from '@/lib/demoData';

const ScenarioPage: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  
  const scenario = demoScenarios.find(s => s.id === scenarioId);

  if (!scenario) {
    return (
      <div className="min-h-screen bg-mystery-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent>
            <h2 className="text-xl font-bold text-accent-500 mb-4">シナリオが見つかりません</h2>
            <Link to="/lobby">
              <Button>ロビーに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateRoom = () => {
    // デモ用のルーム作成（実際のAPI呼び出しは未実装）
    navigate(`/room/${demoGameRoom.id}`);
  };
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/lobby">
            <Button variant="outline" className="mb-4">
              ← ロビーに戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-mystery font-bold text-accent-500">
            {scenario.title}
          </h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>シナリオ詳細</CardTitle>
            <CardDescription>このシナリオの詳細情報を確認できます</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-mystery-100">シナリオ情報</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-mystery-300">難易度:</span>
                    <span className={`font-medium ${
                      scenario.difficulty === 'beginner' ? 'text-green-400' :
                      scenario.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {scenario.difficulty === 'beginner' ? '初級' : 
                       scenario.difficulty === 'intermediate' ? '中級' : '上級'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mystery-300">プレイヤー数:</span>
                    <span className="text-mystery-100 font-medium">{scenario.playerCount}人</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mystery-300">推定時間:</span>
                    <span className="text-mystery-100 font-medium">{scenario.estimatedTime}分</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mystery-300">タグ:</span>
                    <span className="text-mystery-100 font-medium">
                      {scenario.tags.map(tag => `#${tag}`).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 text-mystery-100">あらすじ</h2>
                <p className="text-mystery-300 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-mystery-100">キャラクター</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenario.content.characters.map((character) => (
                  <Card key={character.id} variant="outlined" className="p-4">
                    <h3 className="font-semibold text-mystery-100 mb-2">{character.role}</h3>
                    <p className="text-sm text-mystery-300">{character.name}</p>
                    <p className="text-xs text-mystery-400 mt-1">{character.description}</p>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleCreateRoom}
              >
                このシナリオでルームを作成
              </Button>
              <Link to="/lobby" className="flex-1">
                <Button variant="secondary" className="w-full" size="lg">
                  ロビーに戻る
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioPage;
