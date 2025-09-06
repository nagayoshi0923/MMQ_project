import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// ページコンポーネント（後で実装）
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LobbyPage from './pages/LobbyPage';
import GameRoomPage from './pages/GameRoomPage';
import GamePage from './pages/GamePage';
import ScenarioPage from './pages/ScenarioPage';

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
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/room/:roomId" element={<GameRoomPage />} />
            <Route path="/game/:roomId" element={<GamePage />} />
            <Route path="/scenario/:scenarioId" element={<ScenarioPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
