import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [gmail, setGmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gmail, contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Inicio de sesión exitoso');
        localStorage.setItem('usuario', JSON.stringify({
          ...data.usuario,
          token: data.access_token
        }));

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMensaje('❌ Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  const irARegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-bg">
      <div className="card login-card">
        <div className="text-center mb-3">
          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
          <h4 className="mt-2">Iniciar sesión</h4>
        </div>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
          <button type="button" className="btn btn-outline-secondary w-100" onClick={irARegistro}>
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
