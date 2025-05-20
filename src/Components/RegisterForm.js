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
        headers: { 'Content-Type': 'application/json' },
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
    <div className="d-flex justify-content-center align-items-center login-bg">
      <div className="card login-card">
        <div className="text-center mb-3">
          <i className="bi bi-person-plus-fill" style={{ fontSize: '2.5rem', color: '#0d6efd' }}></i>
          <h4 className="mt-2">Registro de Usuario</h4>
        </div>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input type="text" name="nombre" placeholder="Nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
          <input type="text" name="apellidos" placeholder="Apellidos" className="form-control" value={formData.apellidos} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Correo electrónico" className="form-control" value={formData.gmail} onChange={handleChange} required />
          <input type="password" name="contraseña" placeholder="Contraseña" className="form-control" value={formData.contraseña} onChange={handleChange} required />
          <input type="text" name="telefono" placeholder="Teléfono (opcional)" className="form-control" value={formData.telefono} onChange={handleChange} />

          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
