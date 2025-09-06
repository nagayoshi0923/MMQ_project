import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const GameRoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-4xl mx-auto">
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
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>ルーム情報</CardTitle>
              <span className="text-sm text-mystery-300 bg-mystery-700 px-3 py-1 rounded-full">
                ルームコード: ABC123
              </span>
            </div>
            <CardDescription>
              プレイヤーが集まったらゲームを開始できます
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* プレイヤー一覧 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-mystery-100">プレイヤー (4/6人)</h3>
                <div className="space-y-2">
                  <Card variant="outlined" className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-mystery-100">プレイヤー1 (ホスト)</span>
                      <span className="text-green-400 text-sm font-medium">準備完了</span>
                    </div>
                  </Card>
                  <Card variant="outlined" className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-mystery-100">プレイヤー2</span>
                      <span className="text-yellow-400 text-sm font-medium">準備中</span>
                    </div>
                  </Card>
                  <Card variant="outlined" className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-mystery-100">プレイヤー3</span>
                      <span className="text-green-400 text-sm font-medium">準備完了</span>
                    </div>
                  </Card>
                  <Card variant="outlined" className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-mystery-100">プレイヤー4</span>
                      <span className="text-green-400 text-sm font-medium">準備完了</span>
                    </div>
                  </Card>
                </div>
              </div>

              {/* ルーム設定 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-mystery-100">ルーム設定</h3>
                <div className="space-y-4">
                  <Input
                    label="シナリオ"
                    value="マンション事件"
                    readOnly
                    helperText="シナリオは変更できません"
                  />
                  <div>
                    <label className="block text-sm font-medium text-mystery-300 mb-2">
                      最大プレイヤー数
                    </label>
                    <select className="w-full px-3 py-2 bg-mystery-800 border border-mystery-600 rounded-lg text-mystery-100 focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option>4人</option>
                      <option>6人</option>
                      <option>8人</option>
                      <option>10人</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button className="flex-1" size="lg">
                ゲーム開始
              </Button>
              <Link to="/lobby" className="flex-1">
                <Button variant="secondary" className="w-full" size="lg">
                  ルームを退出
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameRoomPage;
