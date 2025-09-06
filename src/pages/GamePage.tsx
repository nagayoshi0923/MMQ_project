import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-mystery font-bold text-accent-500">
            ゲーム画面
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-mystery-300 bg-mystery-800 px-3 py-1 rounded-full">
              フェーズ: 事件概要
            </div>
            <div className="text-sm text-accent-400 bg-accent-900/20 px-3 py-1 rounded-full">
              残り時間: 05:00
            </div>
            <Link to="/lobby">
              <Button variant="outline" size="sm">
                退出
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインゲームエリア */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>事件概要</CardTitle>
                <CardDescription>事件の詳細を確認してください</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-mystery-300 leading-relaxed">
                  昨夜、マンションの一室で殺人事件が発生しました。被害者は...
                  この事件の謎を解き明かすために、プレイヤーたちは協力して
                  証拠を集め、容疑者を特定する必要があります。
                </p>
              </CardContent>
            </Card>
            
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
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* チャット */}
            <Card>
              <CardHeader>
                <CardTitle>チャット</CardTitle>
                <CardDescription>プレイヤーと議論しましょう</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-mystery-800 rounded-lg p-3 mb-3 overflow-y-auto border border-mystery-600">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-accent-400 font-medium">プレイヤー1:</span>
                      <span className="text-mystery-300 ml-2">こんにちは！</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-accent-400 font-medium">プレイヤー2:</span>
                      <span className="text-mystery-300 ml-2">よろしくお願いします</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-accent-400 font-medium">プレイヤー3:</span>
                      <span className="text-mystery-300 ml-2">事件の詳細を教えてください</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="メッセージを入力..."
                    className="flex-1"
                  />
                  <Button size="sm">
                    送信
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 投票 */}
            <Card>
              <CardHeader>
                <CardTitle>投票</CardTitle>
                <CardDescription>容疑者に投票してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    容疑者A - 田中太郎
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    容疑者B - 佐藤花子
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    容疑者C - 鈴木一郎
                  </Button>
                </div>
                <div className="mt-4 text-xs text-mystery-400">
                  投票は議論フェーズで可能になります
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
