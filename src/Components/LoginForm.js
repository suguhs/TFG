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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gmail, contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Inicio de sesión exitoso');
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
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
    <div>
      <h2>Iniciar sesión</h2>
      {mensaje && <p style={{ color: mensaje.includes('✅') ? 'green' : 'red' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <button type="button" onClick={irARegistro}>Crear cuenta</button>
      </form>
    </div>
  );
}

export default LoginForm;
