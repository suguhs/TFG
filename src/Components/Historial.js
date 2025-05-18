import React, { useEffect, useState } from 'react';
import axiosCliente from './AxiosCliente';

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarPendientes, setMostrarPendientes] = useState(false);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cargarReservas = () => {
    const url = usuario.rol === 'admin'
      ? '/historial-todas'
      : `/historial?id_usuario=${usuario.id_usuario}`;

    axiosCliente.get(url)
      .then(res => setReservas(res.data))
      .catch(err => console.error('Error cargando historial:', err));
  };

  const cambiarEstado = (id, nuevoEstado) => {
    axiosCliente.post(`/reservas/${id}/estado`, { estado: nuevoEstado })
      .then(() => cargarReservas())
      .catch(err => console.error('Error actualizando estado:', err));
  };

  useEffect(() => {
    if (usuario) cargarReservas();
  }, []);

  const reservasFiltradas = mostrarPendientes
    ? reservas.filter(r => r.estado === 'pendiente')
    : reservas;

  return (
    <div className="container mt-4">
      <h2>Historial de pedidos</h2>

      {usuario?.rol === 'admin' && (
        <div className="mb-3">
          <button className="btn btn-secondary me-2" onClick={() => setMostrarPendientes(false)}>
            Ver todos
          </button>
          <button className="btn btn-warning" onClick={() => setMostrarPendientes(true)}>
            Ver pendientes
          </button>
        </div>
      )}

      {reservasFiltradas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        reservasFiltradas.map(reserva => (
          <div key={reserva.reserva_id} className="card mb-3">
            <div className="card-body">
              <h5>Fecha: {reserva.fecha_reserva} - {reserva.hora_reserva}</h5>
              <p><strong>Personas:</strong> {reserva.numero_personas}</p>
              <p><strong>Subtotal:</strong> {Number(reserva.subtotal).toFixed(2)} €</p>
              <p><strong>Estado:</strong> {reserva.estado}</p>
              <ul>
                {reserva.detalles.map((d, index) => (
                  <li key={index}>
                    {d.plato?.nombre_plato || 'Plato eliminado'} x {d.cantidad}
                  </li>
                ))}
              </ul>

              {usuario?.rol === 'admin' && reserva.estado === 'pendiente' && (
                <div className="mt-3">
                  <button className="btn btn-success me-2" onClick={() => cambiarEstado(reserva.reserva_id, 'aceptada')}>
                    Aceptar
                  </button>
                  <button className="btn btn-danger" onClick={() => cambiarEstado(reserva.reserva_id, 'rechazada')}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Historial;
