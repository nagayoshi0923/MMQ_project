import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mystery-900">
      <Card className="max-w-md w-full mx-4" variant="elevated">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-mystery font-bold text-accent-500">
            新規登録
          </CardTitle>
          <CardDescription>
            アカウントを作成してゲームを始めましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="ユーザー名"
              placeholder="ユーザー名を入力"
              isRequired
            />
            <Input
              label="メールアドレス"
              type="email"
              placeholder="メールアドレスを入力"
              isRequired
            />
            <Input
              label="パスワード"
              type="password"
              placeholder="パスワードを入力"
              isRequired
            />
            <Input
              label="パスワード確認"
              type="password"
              placeholder="パスワードを再入力"
              isRequired
            />
            <Button className="w-full" size="lg">
              登録
            </Button>
            <Link to="/login">
              <Button variant="outline" className="w-full" size="lg">
                ログインページに戻る
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
