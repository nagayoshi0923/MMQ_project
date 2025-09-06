import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore, Evidence } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';

interface EvidencePanelProps {
  className?: string;
}

const EvidencePanel: React.FC<EvidencePanelProps> = ({ className }) => {
  const { gameState, addEvidence, revealEvidence } = useGameStore();
  const { user } = useAuthStore();
  const [isAddingEvidence, setIsAddingEvidence] = useState(false);
  const [newEvidence, setNewEvidence] = useState({
    name: '',
    description: '',
    location: '',
    category: 'physical' as const
  });

  const handleAddEvidence = () => {
    if (!newEvidence.name.trim() || !newEvidence.description.trim()) return;

    addEvidence({
      name: newEvidence.name,
      description: newEvidence.description,
      location: newEvidence.location,
      discoveredBy: user?.displayName || 'Unknown',
      isRevealed: false,
      category: newEvidence.category
    });

    setNewEvidence({
      name: '',
      description: '',
      location: '',
      category: 'physical'
    });
    setIsAddingEvidence(false);
  };

  const handleRevealEvidence = (evidenceId: string) => {
    revealEvidence(evidenceId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return '🔍';
      case 'testimony': return '💬';
      case 'document': return '📄';
      case 'digital': return '💻';
      default: return '❓';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'text-blue-400 bg-blue-900/20';
      case 'testimony': return 'text-green-400 bg-green-900/20';
      case 'document': return 'text-yellow-400 bg-yellow-900/20';
      case 'digital': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  if (!gameState) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>証拠一覧</CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAddingEvidence(!isAddingEvidence)}
            disabled={gameState.phase !== 'investigation'}
          >
            {isAddingEvidence ? 'キャンセル' : '証拠を追加'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* 証拠追加フォーム */}
        {isAddingEvidence && (
          <div className="mb-4 p-4 bg-mystery-800 rounded-lg border border-mystery-600">
            <h4 className="text-sm font-medium text-mystery-100 mb-3">新しい証拠を追加</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="証拠名"
                value={newEvidence.name}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-mystery-700 border border-mystery-600 rounded-lg text-mystery-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <textarea
                placeholder="証拠の詳細説明"
                value={newEvidence.description}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-mystery-700 border border-mystery-600 rounded-lg text-mystery-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 h-20 resize-none"
              />
              <input
                type="text"
                placeholder="発見場所"
                value={newEvidence.location}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 bg-mystery-700 border border-mystery-600 rounded-lg text-mystery-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <select
                value={newEvidence.category}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 bg-mystery-700 border border-mystery-600 rounded-lg text-mystery-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="physical">物理的証拠</option>
                <option value="testimony">証言</option>
                <option value="document">文書</option>
                <option value="digital">デジタル証拠</option>
              </select>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddEvidence}>
                  追加
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsAddingEvidence(false)}>
                  キャンセル
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 証拠一覧 */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {gameState.evidence.length === 0 ? (
            <p className="text-mystery-400 text-sm text-center py-4">
              まだ証拠が発見されていません
            </p>
          ) : (
            gameState.evidence.map((evidence) => (
              <div
                key={evidence.id}
                className={`p-3 rounded-lg border ${
                  evidence.isRevealed 
                    ? 'bg-mystery-800 border-mystery-600' 
                    : 'bg-mystery-900 border-mystery-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(evidence.category)}</span>
                    <h4 className="font-medium text-mystery-100">{evidence.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(evidence.category)}`}>
                      {evidence.category}
                    </span>
                  </div>
                  {!evidence.isRevealed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRevealEvidence(evidence.id)}
                    >
                      公開
                    </Button>
                  )}
                </div>
                
                {evidence.isRevealed && (
                  <div className="space-y-2">
                    <p className="text-sm text-mystery-300">{evidence.description}</p>
                    {evidence.location && (
                      <p className="text-xs text-mystery-400">
                        発見場所: {evidence.location}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-mystery-500">
                      <span>発見者: {evidence.discoveredBy}</span>
                      <span>
                        {evidence.discoveredAt ? new Date(evidence.discoveredAt).toLocaleTimeString('ja-JP') : ''}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* フェーズ制限メッセージ */}
        {gameState.phase !== 'investigation' && (
          <div className="mt-4 p-3 bg-mystery-800 rounded-lg border border-mystery-600">
            <p className="text-sm text-mystery-400 text-center">
              証拠の追加は捜査フェーズでのみ可能です
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EvidencePanel;
