import React, { useEffect, useState } from 'react';
import axiosCliente from './AxiosCliente';

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const [modo, setModo] = useState('reservas'); // 'reservas' o 'pedidos'
  const [mostrarPendientes, setMostrarPendientes] = useState(false);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cargarDatos = () => {
    if (modo === 'reservas') {
      const url = usuario.rol === 'admin'
        ? '/historial-todas'
        : `/historial?id_usuario=${usuario.id_usuario}`;

      axiosCliente.get(url)
        .then(res => setReservas(res.data))
        .catch(err => console.error('Error cargando historial:', err));
    } else {
      axiosCliente.get('/pedidos')
        .then(res => setReservas(res.data))
        .catch(err => console.error('Error cargando pedidos:', err));
    }
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const endpoint = modo === 'reservas' ? `/reservas/${id}/estado` : `/pedidos/${id}/estado`;
    axiosCliente.post(endpoint, { estado: nuevoEstado })
      .then(() => cargarDatos())
      .catch(err => console.error('Error actualizando estado:', err));
  };

  useEffect(() => {
    if (usuario) cargarDatos();
  }, [modo]);

  const datosFiltrados = mostrarPendientes
    ? reservas.filter(r => r.estado === 'pendiente')
    : reservas;

  return (
    <div className="container mt-4">
      <h2>Historial de {modo === 'reservas' ? 'reservas' : 'pedidos a domicilio'}</h2>

      {usuario?.rol === 'admin' && (
        <div className="mb-3 d-flex gap-2 flex-wrap">
          <button
            className={`btn ${modo === 'reservas' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setModo('reservas')}
          >
            Ver reservas
          </button>
          <button
            className={`btn ${modo === 'pedidos' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setModo('pedidos')}
          >
            Ver pedidos a domicilio
          </button>
          <button
            className="btn btn-warning ms-auto"
            onClick={() => setMostrarPendientes(prev => !prev)}
          >
            {mostrarPendientes ? 'Ver todos' : 'Ver pendientes'}
          </button>
        </div>
      )}

      {datosFiltrados.length === 0 ? (
        <p>No hay {modo === 'reservas' ? 'reservas' : 'pedidos'} registrados.</p>
      ) : (
        datosFiltrados.map((dato) => (
          <div key={dato.reserva_id || dato.id_pedido} className="card mb-3">
            <div className="card-body">
              {modo === 'reservas' ? (
                <>
                  <h5>Fecha: {dato.fecha_reserva} - {dato.hora_reserva}</h5>
                  <p><strong>Personas:</strong> {dato.numero_personas}</p>
                </>
              ) : (
                <>
                  <h5>Dirección: {dato.direccion}</h5>
                  <p><strong>Total:</strong> {Number(dato.subtotal).toFixed(2)} €</p>
                </>
              )}

              {usuario?.rol === 'admin' && (
                <>
                  <p><strong>Cliente:</strong> {dato.usuario?.nombre} {dato.usuario?.apellidos}</p>
                  <p><strong>Teléfono:</strong> {dato.usuario?.telefono}</p>
                </>
              )}

              <p><strong>Estado:</strong> {dato.estado}</p>

              <ul>
                {(dato.detalles || []).map((d, index) => (
                  <li key={index}>
                    {d.plato?.nombre_plato || 'Plato eliminado'} x {d.cantidad}
                  </li>
                ))}
              </ul>

              {usuario?.rol === 'admin' && dato.estado === 'pendiente' && (
                <div className="mt-3">
                  <button
                    className="btn btn-success me-2"
                    onClick={() => cambiarEstado(dato.reserva_id || dato.id_pedido, 'aceptada')}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => cambiarEstado(dato.reserva_id || dato.id_pedido, 'rechazada')}
                  >
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
