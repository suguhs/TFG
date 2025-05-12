import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      setNombre(usuario.nombre);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario'); // 👈 Borrar sesión
    navigate('/login'); // 👈 Redirigir a login
  };

  return (
    <div>
      <h2>Bienvenido{nombre && `, ${nombre}`}</h2>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}

export default Bienvenida;
