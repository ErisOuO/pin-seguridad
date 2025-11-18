import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecoveryPasswordPage from './components/RecoveryPasswordPage';

export default function App() {
  const [screen, setScreen] = useState('login');

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          {screen === 'login' && 'Bienvenido de nuevo'}
          {screen === 'register' && 'Crea tu cuenta'}
          {screen === 'recovery' && 'Recuperar contraseña'}
        </h2>

        {screen === 'login' && (
          <LoginForm
            onToggleRegister={() => setScreen('register')}
            onToggleRecovery={() => setScreen('recovery')}
          />
        )}

        {screen === 'register' && (
          <RegisterForm onToggle={() => setScreen('login')} />
        )}

        {screen === 'recovery' && (
          <RecoveryPasswordPage onBackLogin={() => setScreen('login')} />
        )}
      </div>
    </div>
  );
}
