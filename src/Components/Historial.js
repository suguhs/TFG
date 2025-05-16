import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (usuario) {
      axios.get(`http://127.0.0.1:8000/api/historial?id_usuario=${usuario.id_usuario}`)
        .then(res => setReservas(res.data))
        .catch(err => console.error('Error cargando historial:', err));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Historial de pedidos</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        reservas.map(reserva => (
          <div key={reserva.reserva_id} className="card mb-3">
            <div className="card-body">
              <h5>Fecha: {reserva.fecha_reserva} - {reserva.hora_reserva}</h5>
              <p><strong>Personas:</strong> {reserva.numero_personas}</p>
              <p><strong>Subtotal:</strong> {Number(reserva.subtotal).toFixed(2)} €</p>
              <ul>
                {reserva.detalles.map((d, index) => (
                  <li key={index}>
                    {d.plato?.nombre_plato || 'Plato eliminado'} x {d.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Historial;
