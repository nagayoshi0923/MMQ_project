import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const LoginPage: React.FC = () => {
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
            <Button className="w-full" size="lg">
              🎮 デモでログイン（動作確認用）
            </Button>
            <Button variant="secondary" className="w-full" size="lg">
              ログイン
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
