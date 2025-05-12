import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    gmail: '',
    contraseña: '',
    telefono: '',
    rol: 'guest'
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Usuario registrado correctamente.');
        setFormData({
          nombre: '',
          apellidos: '',
          gmail: '',
          contraseña: '',
          telefono: '',
          rol: 'guest'
        });

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (res.status === 422 && data.errors) {
        const errores = Object.values(data.errors).flat().join('\n');
        setMensaje('❌ ' + errores);
      } else {
        setMensaje('❌ Error inesperado del servidor.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al conectar con el servidor.');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {mensaje && <p style={{ color: mensaje.includes('✅') ? 'green' : 'red' }}>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
        <input type="email" name="gmail" placeholder="Correo" value={formData.gmail} onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterForm;
