import React, { useState } from 'react';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Usuario registrado correctamente.');
        setFormData({
          nombre: '',
          apellidos: '',
          gmail: '',
          contraseña: '',
          telefono: '',
          rol: 'guest'
        });
      } else {
        setMensaje('Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {mensaje && <p>{mensaje}</p>}
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
