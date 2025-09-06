import React from 'react';

const GameRoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-mystery font-bold text-center mb-8 text-accent-500">
          ゲームルーム
        </h1>
        
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-mystery-100">ルーム情報</h2>
            <span className="text-sm text-mystery-300">ルームコード: ABC123</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* プレイヤー一覧 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-mystery-100">プレイヤー (4/6人)</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-mystery-700 rounded-lg">
                  <span className="text-mystery-100">プレイヤー1 (ホスト)</span>
                  <span className="text-green-400 text-sm">準備完了</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-mystery-700 rounded-lg">
                  <span className="text-mystery-100">プレイヤー2</span>
                  <span className="text-yellow-400 text-sm">準備中</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-mystery-700 rounded-lg">
                  <span className="text-mystery-100">プレイヤー3</span>
                  <span className="text-green-400 text-sm">準備完了</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-mystery-700 rounded-lg">
                  <span className="text-mystery-100">プレイヤー4</span>
                  <span className="text-green-400 text-sm">準備完了</span>
                </div>
              </div>
            </div>

            {/* ルーム設定 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-mystery-100">ルーム設定</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mystery-300 mb-2">
                    シナリオ
                  </label>
                  <select className="input">
                    <option>マンション事件</option>
                    <option>豪華客船の謎</option>
                    <option>古城の呪い</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-mystery-300 mb-2">
                    最大プレイヤー数
                  </label>
                  <select className="input">
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
            <button className="btn-primary flex-1">
              ゲーム開始
            </button>
            <button className="btn-secondary flex-1">
              ルームを退出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoomPage;
