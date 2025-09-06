import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore, Character } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';

interface CharacterAssignmentProps {
  className?: string;
}

const CharacterAssignment: React.FC<CharacterAssignmentProps> = ({ className }) => {
  const { gameState, assignCharacter } = useGameStore();
  const { user } = useAuthStore();
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignCharacter = (characterId: string) => {
    if (!user || !gameState) return;

    assignCharacter(characterId, user.id);
    setIsAssigning(false);
  };

  const getAssignedPlayer = (characterId: string) => {
    if (!gameState) return null;
    const character = gameState.characters.find(c => c.id === characterId);
    return character?.assignedTo;
  };

  const getUserCharacter = () => {
    if (!user || !gameState) return null;
    return gameState.characters.find(c => c.assignedTo === user.id);
  };

  const isCharacterAssigned = (characterId: string) => {
    return getAssignedPlayer(characterId) !== undefined;
  };

  const canAssignCharacter = (characterId: string) => {
    if (!user || !gameState) return false;
    const character = gameState.characters.find(c => c.id === characterId);
    return !character?.assignedTo && !getUserCharacter();
  };

  const userCharacter = getUserCharacter();

  if (!gameState) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>キャラクター割り当て</CardTitle>
      </CardHeader>
      <CardContent>
        {gameState.phase === 'overview' ? (
          <div className="space-y-4">
            {/* 現在のキャラクター */}
            {userCharacter ? (
              <div className="p-4 bg-accent-900/20 border border-accent-500 rounded-lg">
                <h4 className="text-sm font-medium text-accent-400 mb-2">
                  あなたのキャラクター
                </h4>
                <div className="space-y-2">
                  <h5 className="font-medium text-mystery-100">{userCharacter.name}</h5>
                  <p className="text-sm text-mystery-300">{userCharacter.role}</p>
                  <p className="text-xs text-mystery-400">{userCharacter.description}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-mystery-400 text-sm mb-4">
                  キャラクターを選択してください
                </p>
                <Button
                  size="sm"
                  onClick={() => setIsAssigning(!isAssigning)}
                >
                  {isAssigning ? 'キャンセル' : 'キャラクターを選択'}
                </Button>
              </div>
            )}

            {/* キャラクター選択 */}
            {isAssigning && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-mystery-100 mb-3">
                  利用可能なキャラクター
                </h4>
                {gameState.characters.map((character) => (
                  <div
                    key={character.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      isCharacterAssigned(character.id)
                        ? 'bg-mystery-800 border-mystery-600 opacity-50'
                        : 'bg-mystery-800 border-mystery-600 hover:bg-mystery-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-mystery-100">{character.name}</h5>
                        <p className="text-sm text-mystery-400">{character.role}</p>
                        <p className="text-xs text-mystery-500 mt-1">{character.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCharacterAssigned(character.id) ? (
                          <span className="text-xs text-mystery-500">
                            選択済み
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignCharacter(character.id)}
                            disabled={!canAssignCharacter(character.id)}
                          >
                            選択
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* キャラクター一覧 */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-mystery-100 mb-3">
                全キャラクター
              </h4>
              <div className="space-y-2">
                {gameState.characters.map((character) => (
                  <div
                    key={character.id}
                    className="p-3 bg-mystery-800 rounded-lg border border-mystery-600"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-mystery-100">{character.name}</h5>
                        <p className="text-sm text-mystery-400">{character.role}</p>
                      </div>
                      <div className="text-right">
                        {character.assignedTo ? (
                          <span className="text-xs text-green-400">
                            割り当て済み
                          </span>
                        ) : (
                          <span className="text-xs text-mystery-500">
                            未割り当て
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 現在のキャラクター情報 */}
            {userCharacter ? (
              <div className="p-4 bg-mystery-800 rounded-lg border border-mystery-600">
                <h4 className="text-sm font-medium text-mystery-100 mb-3">
                  あなたのキャラクター
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-mystery-100">{userCharacter.name}</h5>
                    <p className="text-sm text-mystery-400">{userCharacter.role}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <h6 className="text-xs font-medium text-mystery-300 mb-1">アリバイ</h6>
                      <p className="text-sm text-mystery-400">{userCharacter.alibi}</p>
                    </div>
                    
                    <div>
                      <h6 className="text-xs font-medium text-mystery-300 mb-1">動機</h6>
                      <p className="text-sm text-mystery-400">{userCharacter.motive}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-mystery-400 text-sm">
                  キャラクターが割り当てられていません
                </p>
              </div>
            )}

            {/* 他のキャラクター一覧 */}
            <div>
              <h4 className="text-sm font-medium text-mystery-100 mb-3">
                他のキャラクター
              </h4>
              <div className="space-y-2">
                {gameState.characters
                  .filter(c => c.assignedTo && c.assignedTo !== user?.id)
                  .map((character) => (
                    <div
                      key={character.id}
                      className="p-3 bg-mystery-800 rounded-lg border border-mystery-600"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-mystery-100">{character.name}</h5>
                          <p className="text-sm text-mystery-400">{character.role}</p>
                        </div>
                        <span className="text-xs text-green-400">
                          プレイヤーが選択済み
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterAssignment;
