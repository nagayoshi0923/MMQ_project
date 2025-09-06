import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { generateId } from '@/lib/utils';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const handleInputChange = (field: keyof RegisterForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'ユーザー名は必須です';
    } else if (formData.username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上で入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = '表示名は必須です';
    }

    if (!formData.password) {
      newErrors.password = 'パスワードは必須です';
    } else if (formData.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // デモ用の登録処理（実際のAPI呼び出しは未実装）
    const newUser = {
      id: generateId(),
      email: formData.email,
      username: formData.username,
      displayName: formData.displayName,
      createdAt: new Date(),
    };

    login(newUser);
    navigate('/lobby');
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="ユーザー名"
              placeholder="ユーザー名を入力"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              error={errors.username}
              isRequired
            />
            <Input
              label="表示名"
              placeholder="表示名を入力"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              error={errors.displayName}
              isRequired
            />
            <Input
              label="メールアドレス"
              type="email"
              placeholder="メールアドレスを入力"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              isRequired
            />
            <Input
              label="パスワード"
              type="password"
              placeholder="パスワードを入力"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              isRequired
            />
            <Input
              label="パスワード確認"
              type="password"
              placeholder="パスワードを再入力"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              isRequired
            />
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              isLoading={isLoading}
            >
              登録
            </Button>
            <Link to="/login">
              <Button variant="outline" className="w-full" size="lg">
                ログインページに戻る
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
