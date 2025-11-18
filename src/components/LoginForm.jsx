import { useState } from 'react';
import VerifyCodeForm from './VerifyCodeForm';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm({ onToggleRegister, onToggleRecovery }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [msg, setMsg] = useState('');
  const [verifiedStep, setVerifiedStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://server-wcpl.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena }),
    });
    const data = await res.json();
    if (data.success) setVerifiedStep(true);
    setMsg(data.error || '');
  };

  if (verifiedStep) return <VerifyCodeForm usuario={usuario} />;

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className="form-control"
            placeholder="Tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label">Contraseña</label>

          <input
            className="form-control"
            type={showPassword ? 'text' : 'password'}
            placeholder="Tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="position-absolute"
            style={{
              right: '10px',
              top: '38px',
              background: 'none',
              border: 'none',
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Iniciar sesión
        </button>

        <p className="text-center text-muted mb-0">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={onToggleRegister}
          >
            Regístrate aquí
          </button>
        </p>

        <p className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={onToggleRecovery}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        {msg && <div className="alert alert-danger mt-3 text-center">{msg}</div>}
      </form>
    </>
  );
}
