// src/components/ReservaForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservaForm = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [horaMinima, setHoraMinima] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(user);

    const ahora = new Date();
    const hoy = ahora.toISOString().split('T')[0];
    setFecha(hoy);

    // Calcular una hora mínima con al menos 1 hora de margen
    ahora.setHours(ahora.getHours() + 1);
    const horaFormat = ahora.toTimeString().slice(0, 5);
    setHoraMinima(horaFormat);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      setMensaje('Debes iniciar sesión para reservar.');
      return;
    }

    // Validación adicional en el cliente (hora mínima si es hoy)
    const hoy = new Date().toISOString().split('T')[0];
    if (fecha === hoy && hora < horaMinima) {
      setMensaje(`La hora debe ser al menos ${horaMinima} para hoy.`);
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/reservas', {
        id_usuario: usuario.id_usuario,
        fecha_reserva: fecha,
        hora_reserva: hora,
        numero_personas: personas
      });
      const reserva = res.data.reserva;
      navigate(`/reservas/${reserva.reserva_id}/platos`);
    } catch (error) {
      setMensaje(error.response?.data?.message || 'Error al hacer la reserva');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reservar mesa</h2>
      {mensaje && <div className="alert alert-warning">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            min={fecha === new Date().toISOString().split('T')[0] ? horaMinima : ''}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Personas</label>
          <input
            type="number"
            min="1"
            max="20"
            className="form-control"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Reservar</button>
        </div>
      </form>
    </div>
  );
};

export default ReservaForm;
