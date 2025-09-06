import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { demoUser } from '@/lib/demoData';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleDemoLogin = () => {
    login(demoUser);
    navigate('/lobby');
  };

  const handleGameLogin = () => {
    login(demoUser);
    navigate('/game/demo-room');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mystery-900">
      <Card className="max-w-md w-full mx-4" variant="elevated">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-mystery font-bold text-accent-500">
            Murder Mystery Platform
          </CardTitle>
          <CardDescription className="text-mystery-300">
            オンラインで殺人ミステリーゲームを楽しもう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleDemoLogin}
              isLoading={isLoading}
            >
              🎮 デモでログイン（ロビーへ）
            </Button>
            <Button 
              variant="secondary" 
              className="w-full" 
              size="lg"
              onClick={handleGameLogin}
              isLoading={isLoading}
            >
              🎯 ゲーム画面へ直接（マダミス開始）
            </Button>
            <Button variant="outline" className="w-full" size="lg" disabled>
              ログイン（未実装）
            </Button>
            <Link to="/register">
              <Button variant="outline" className="w-full" size="lg">
                新規登録
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
