import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mystery-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="読み込み中..." />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // ログインが必要なページにアクセスしようとした場合
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // ログイン済みのユーザーがログインページにアクセスした場合
    return <Navigate to="/lobby" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
