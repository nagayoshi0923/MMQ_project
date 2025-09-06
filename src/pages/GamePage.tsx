import React from 'react';

const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-mystery font-bold text-accent-500">
            ゲーム画面
          </h1>
          <div className="text-sm text-mystery-300">
            フェーズ: 事件概要 | 残り時間: 05:00
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインゲームエリア */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4 text-mystery-100">事件概要</h2>
              <p className="text-mystery-300">
                昨夜、マンションの一室で殺人事件が発生しました。被害者は...
              </p>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-mystery-100">間取り図</h2>
              <div className="bg-mystery-700 h-64 rounded-lg flex items-center justify-center">
                <span className="text-mystery-400">間取り図がここに表示されます</span>
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* チャット */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-mystery-100">チャット</h3>
              <div className="h-48 bg-mystery-800 rounded-lg p-3 mb-3 overflow-y-auto">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-accent-400">プレイヤー1:</span>
                    <span className="text-mystery-300 ml-2">こんにちは！</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-accent-400">プレイヤー2:</span>
                    <span className="text-mystery-300 ml-2">よろしくお願いします</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="メッセージを入力..."
                />
                <button className="btn-primary px-4">
                  送信
                </button>
              </div>
            </div>

            {/* 投票 */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-mystery-100">投票</h3>
              <div className="space-y-2">
                <button className="w-full p-3 bg-mystery-700 hover:bg-mystery-600 rounded-lg text-left">
                  容疑者A
                </button>
                <button className="w-full p-3 bg-mystery-700 hover:bg-mystery-600 rounded-lg text-left">
                  容疑者B
                </button>
                <button className="w-full p-3 bg-mystery-700 hover:bg-mystery-600 rounded-lg text-left">
                  容疑者C
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
