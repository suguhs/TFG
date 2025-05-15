// src/components/SeleccionPlatos.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SeleccionPlatos = () => {
  const { id } = useParams(); // id de la reserva
  const [platos, setPlatos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/platos')
      .then(res => setPlatos(res.data))
      .catch(err => console.error('Error cargando platos:', err));
  }, []);

  const togglePlato = (plato) => {
    const existe = seleccionados.find(p => p.plato_id === plato.id_plato);
    if (existe) {
      setSeleccionados(seleccionados.filter(p => p.plato_id !== plato.id_plato));
    } else {
      setSeleccionados([...seleccionados, { plato_id: plato.id_plato, cantidad: 1, precio: Number(plato.precio) }]);
    }
  };

  const cambiarCantidad = (plato_id, cantidad) => {
    setSeleccionados(prev =>
      prev.map(p =>
        p.plato_id === plato_id ? { ...p, cantidad: parseInt(cantidad) || 1 } : p
      )
    );
  };

  const enviarPlatos = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/reservas/${id}/platos`, {
        platos: seleccionados
      });
      setMensaje('✅ Platos añadidos correctamente a la reserva');
      setSeleccionados([]);
    } catch (error) {
      setMensaje('❌ Error al guardar los platos');
    }
  };

  const calcularTotal = () => {
    return seleccionados.reduce((total, p) => total + p.precio * p.cantidad, 0);
  };

  return (
    <div className="container mt-4">
      <h2>Selecciona tus platos</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <div className="row">
        {platos.map(plato => {
          const estaSeleccionado = seleccionados.find(p => p.plato_id === plato.id_plato);
          return (
            <div className="col-md-4 mb-3" key={plato.id_plato}>
              <div className={`card ${estaSeleccionado ? 'border-success' : ''}`}>
                <div className="card-body">
                  <h5>{plato.nombre_plato}</h5>
                  <p>{plato.descripcion}</p>
                  <p><strong>{Number(plato.precio).toFixed(2)} €</strong></p>
                  {estaSeleccionado && (
                    <input
                      type="number"
                      min="1"
                      value={estaSeleccionado.cantidad}
                      onChange={(e) => cambiarCantidad(plato.id_plato, e.target.value)}
                      className="form-control mb-2"
                    />
                  )}
                  <button className="btn btn-primary" onClick={() => togglePlato(plato)}>
                    {estaSeleccionado ? 'Quitar' : 'Añadir'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {seleccionados.length > 0 && (
        <>
          <div className="mt-3">
            <h5>Total: {calcularTotal().toFixed(2)} €</h5>
          </div>
          <button className="btn btn-success mt-2" onClick={enviarPlatos}>Enviar platos</button>
        </>
      )}
    </div>
  );
};

export default SeleccionPlatos;
