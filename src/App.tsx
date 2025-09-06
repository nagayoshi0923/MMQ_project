// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// ページコンポーネント
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LobbyPage from './pages/LobbyPage';
import GameRoomPage from './pages/GameRoomPage';
import GamePage from './pages/GamePage';
import ScenarioPage from './pages/ScenarioPage';

// 認証ガード
import AuthGuard from './components/auth/AuthGuard';

// エラーフォールバックコンポーネント
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-mystery-900 flex items-center justify-center">
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-accent-500 mb-4">エラーが発生しました</h2>
        <p className="text-mystery-300 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="btn-primary"
        >
          再試行
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="min-h-screen bg-mystery-900">
          <Routes>
            {/* 認証不要なページ */}
            <Route path="/" element={<AuthGuard requireAuth={false}><LoginPage /></AuthGuard>} />
            <Route path="/login" element={<AuthGuard requireAuth={false}><LoginPage /></AuthGuard>} />
            <Route path="/register" element={<AuthGuard requireAuth={false}><RegisterPage /></AuthGuard>} />
            
            {/* 認証が必要なページ */}
            <Route path="/lobby" element={<AuthGuard requireAuth={true}><LobbyPage /></AuthGuard>} />
            <Route path="/room/:roomId" element={<AuthGuard requireAuth={true}><GameRoomPage /></AuthGuard>} />
            <Route path="/game/:roomId" element={<AuthGuard requireAuth={true}><GamePage /></AuthGuard>} />
            <Route path="/scenario/:scenarioId" element={<AuthGuard requireAuth={true}><ScenarioPage /></AuthGuard>} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
