import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useGameRoomStore } from '@/stores/gameRoomStore';
import { useAuthStore } from '@/stores/authStore';

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatMessages, addChatMessage } = useGameRoomStore();
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;

    addChatMessage({
      playerId: user.id,
      playerName: user.displayName,
      message: message.trim(),
      type: 'message'
    });

    setMessage('');
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">チャット</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-80">
        {/* メッセージ一覧 */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
          {chatMessages.length === 0 ? (
            <p className="text-mystery-400 text-sm text-center py-4">
              まだメッセージがありません
            </p>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg ${
                  msg.type === 'system'
                    ? 'bg-mystery-700/50 text-mystery-300 text-sm text-center'
                    : 'bg-mystery-800'
                }`}
              >
                {msg.type === 'message' && (
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-accent-400 font-medium text-sm">
                          {msg.playerName}
                        </span>
                        <span className="text-mystery-400 text-xs">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-mystery-100 text-sm">{msg.message}</p>
                    </div>
                  </div>
                )}
                {msg.type === 'system' && (
                  <p className="text-mystery-300 text-sm">{msg.message}</p>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* メッセージ入力 */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1"
            maxLength={200}
          />
          <Button 
            type="submit" 
            size="sm"
            disabled={!message.trim()}
          >
            送信
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chat;
