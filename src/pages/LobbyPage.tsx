import React from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const LobbyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-mystery font-bold text-center mb-8 text-accent-500">
          ロビー
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* シナリオ一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>シナリオ一覧</CardTitle>
              <CardDescription>利用可能なシナリオを選択してください</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Card variant="outlined" className="p-4 hover:bg-mystery-700/50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-mystery-100">マンション事件</h3>
                  <p className="text-sm text-mystery-300">初級 | 4-6人 | 60分</p>
                </Card>
                <Card variant="outlined" className="p-4 hover:bg-mystery-700/50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-mystery-100">豪華客船の謎</h3>
                  <p className="text-sm text-mystery-300">中級 | 6-8人 | 90分</p>
                </Card>
                <Card variant="outlined" className="p-4 hover:bg-mystery-700/50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-mystery-100">古城の呪い</h3>
                  <p className="text-sm text-mystery-300">上級 | 8-10人 | 120分</p>
                </Card>
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
                  <h3 className="font-semibold text-mystery-100">デモルーム</h3>
                  <p className="text-sm text-mystery-300">マンション事件 | 4/6人 | 待機中</p>
                  <Button className="mt-2 w-full" size="sm">
                    参加
                  </Button>
                </Card>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                新しいルームを作成
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
