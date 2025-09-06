import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';

interface VotingPanelProps {
  className?: string;
}

const VotingPanel: React.FC<VotingPanelProps> = ({ className }) => {
  const { gameState, addVote } = useGameStore();
  const { user } = useAuthStore();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const handleVote = (characterId: string, characterName: string) => {
    if (!user || !gameState) return;

    addVote({
      voterId: user.id,
      voterName: user.displayName,
      targetId: characterId,
      targetName: characterName
    });

    setSelectedCharacter(characterId);
  };

  const getVoteCount = (characterId: string) => {
    if (!gameState) return 0;
    return gameState.votes.filter(vote => vote.targetId === characterId).length;
  };

  const getUserVote = () => {
    if (!user || !gameState) return null;
    return gameState.votes.find(vote => vote.voterId === user.id);
  };

  const getVoteResults = () => {
    if (!gameState) return [];
    
    const results = gameState.characters.map(character => ({
      character,
      voteCount: getVoteCount(character.id)
    }));

    return results.sort((a, b) => b.voteCount - a.voteCount);
  };

  const userVote = getUserVote();

  if (!gameState) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>投票</CardTitle>
      </CardHeader>
      <CardContent>
        {gameState.phase === 'voting' ? (
          <div className="space-y-4">
            {/* 投票対象キャラクター */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-mystery-100 mb-3">
                容疑者に投票してください
              </h4>
              {gameState.characters.map((character) => (
                <div
                  key={character.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedCharacter === character.id
                      ? 'bg-accent-900/20 border-accent-500'
                      : 'bg-mystery-800 border-mystery-600 hover:bg-mystery-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-mystery-100">{character.name}</h5>
                      <p className="text-sm text-mystery-400">{character.role}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={selectedCharacter === character.id ? "primary" : "outline"}
                      onClick={() => handleVote(character.id, character.name)}
                      disabled={userVote?.targetId === character.id}
                    >
                      {userVote?.targetId === character.id ? '投票済み' : '投票'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* 投票結果 */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-mystery-100 mb-3">
                投票結果
              </h4>
              <div className="space-y-2">
                {getVoteResults().map(({ character, voteCount }) => (
                  <div
                    key={character.id}
                    className="flex items-center justify-between p-2 bg-mystery-800 rounded-lg"
                  >
                    <span className="text-mystery-100">{character.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-mystery-700 rounded-full h-2">
                        <div
                          className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.max(10, (voteCount / Math.max(1, gameState.votes.length)) * 100)}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-mystery-300 w-8 text-right">
                        {voteCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 投票状況 */}
            <div className="mt-4 p-3 bg-mystery-800 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mystery-300">
                  投票者数: {gameState.votes.length} / {gameState.characters.length}
                </span>
                <span className="text-mystery-400">
                  {gameState.votes.length === gameState.characters.length ? '全員投票完了' : '投票待ち'}
                </span>
              </div>
            </div>
          </div>
        ) : gameState.phase === 'results' ? (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-mystery-100 mb-3">
              最終投票結果
            </h4>
            <div className="space-y-3">
              {getVoteResults().map(({ character, voteCount }, index) => (
                <div
                  key={character.id}
                  className={`p-4 rounded-lg border ${
                    index === 0 
                      ? 'bg-red-900/20 border-red-500' 
                      : 'bg-mystery-800 border-mystery-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className={`font-medium ${
                        index === 0 ? 'text-red-400' : 'text-mystery-100'
                      }`}>
                        {index + 1}位: {character.name}
                      </h5>
                      <p className="text-sm text-mystery-400">{character.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-mystery-100">
                        {voteCount}票
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-red-400 font-medium">
                          最多得票
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-mystery-400 text-sm">
              投票は投票フェーズで開始されます
            </p>
            <p className="text-mystery-500 text-xs mt-2">
              現在のフェーズ: {gameState.phase}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VotingPanel;
