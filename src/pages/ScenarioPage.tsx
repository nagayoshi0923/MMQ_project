import React from 'react';

const ScenarioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mystery-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button className="btn-secondary mb-4">
            ← ロビーに戻る
          </button>
          <h1 className="text-3xl font-mystery font-bold text-accent-500">
            マンション事件
          </h1>
        </div>
        
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4 text-mystery-100">シナリオ情報</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-mystery-300">難易度:</span>
                  <span className="ml-2 text-green-400">初級</span>
                </div>
                <div>
                  <span className="text-mystery-300">プレイヤー数:</span>
                  <span className="ml-2 text-mystery-100">4-6人</span>
                </div>
                <div>
                  <span className="text-mystery-300">推定時間:</span>
                  <span className="ml-2 text-mystery-100">60分</span>
                </div>
                <div>
                  <span className="text-mystery-300">タグ:</span>
                  <span className="ml-2 text-mystery-100">#現代 #アパート #初級</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-mystery-100">あらすじ</h2>
              <p className="text-mystery-300">
                昨夜、マンションの一室で殺人事件が発生しました。被害者は...
                この事件の謎を解き明かすために、プレイヤーたちは協力して
                証拠を集め、容疑者を特定する必要があります。
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-mystery-100">キャラクター</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-mystery-700 rounded-lg">
                <h3 className="font-semibold text-mystery-100">容疑者A</h3>
                <p className="text-sm text-mystery-300">被害者の隣人</p>
              </div>
              <div className="p-4 bg-mystery-700 rounded-lg">
                <h3 className="font-semibold text-mystery-100">容疑者B</h3>
                <p className="text-sm text-mystery-300">被害者の友人</p>
              </div>
              <div className="p-4 bg-mystery-700 rounded-lg">
                <h3 className="font-semibold text-mystery-100">容疑者C</h3>
                <p className="text-sm text-mystery-300">被害者の同僚</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button className="btn-primary flex-1">
              このシナリオでルームを作成
            </button>
            <button className="btn-secondary flex-1">
              ロビーに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
