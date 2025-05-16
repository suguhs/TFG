// src/components/ReservaForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservaForm = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [mesasDisponibles, setMesasDisponibles] = useState(null);

  useEffect(() => {
    if (fecha) {
      axios.get(`http://127.0.0.1:8000/api/mesas-disponibles?fecha=${fecha}`)
        .then(res => setMesasDisponibles(res.data.mesas_disponibles))
        .catch(() => setMesasDisponibles(null));
    }
  }, [fecha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      setMensaje('❌ Debes iniciar sesión para reservar');
      return;
    }
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/reservas', {
        id_usuario: usuario.id_usuario,
        fecha_reserva: fecha,
        hora_reserva: hora,
        numero_personas: personas
      });

      const id = res.data.reserva.reserva_id;
      navigate(`/reservas/${id}/platos`);
    } catch (error) {
      const msg = error.response?.data?.message || '❌ Error al crear la reserva';
      setMensaje(msg);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Hacer una reserva</h2>
      {mensaje && <div className="alert alert-warning">{mensaje}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora:</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Número de personas:</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="20"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            required
          />
        </div>

        {mesasDisponibles !== null && (
          <div className="alert alert-info">
            Mesas disponibles para el día seleccionado: <strong>{mesasDisponibles}</strong>
          </div>
        )}

        <button className="btn btn-primary">Reservar</button>
      </form>
    </div>
  );
};

export default ReservaForm;
