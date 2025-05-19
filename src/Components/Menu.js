// src/components/Menu.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const [platos, setPlatos] = useState([]);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre_plato: '',
    descripcion: '',
    precio: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar todos los platos
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/platos')
      .then(res => res.json())
      .then(data => setPlatos(data))
      .catch(err => console.error('Error al cargar platos:', err));
  }, []);

  // Cambios en los campos del formulario
  const handleChange = (e) => {
    setNuevoPlato({
      ...nuevoPlato,
      [e.target.name]: e.target.value
    });
  };

  // Enviar nuevo plato
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/platos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...nuevoPlato, rol: user?.rol })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error');
        setPlatos([...platos, data]);
        setNuevoPlato({ nombre_plato: '', descripcion: '', precio: '' });
        setMostrarFormulario(false);
      })
      .catch(err => {
        console.error('Error al guardar el plato:', err);
        alert('❌ No se pudo guardar el plato. Verifica los campos y el rol.');
      });
  };

  // Manejar pedido a domicilio
  const manejarPedido = () => {
    if (!user) {
      alert('Debes iniciar sesión para hacer un pedido.');
      navigate('/login');
    } else {
      navigate('/pedido-domicilio');
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center text-center">
      <div className="d-flex justify-content-between w-100 mb-3">
        <h2>🍽️ Menú</h2>
        <button className="btn btn-primary" onClick={manejarPedido}>
          🛒 Hacer pedido a domicilio
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
        {platos.map(plato => (
          <div key={plato.id_plato} className="border rounded p-3" style={{ width: '250px' }}>
            <h4>{plato.nombre_plato}</h4>
            <p>{plato.descripcion}</p>
            <p><strong>{plato.precio} €</strong></p>
          </div>
        ))}
      </div>

      {user?.rol === 'admin' && (
        <div className="text-start w-100" style={{ maxWidth: '400px' }}>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="btn btn-link text-decoration-none text-purple mb-3"
          >
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>➕</span>
            Añadir nuevo plato
          </button>

          {mostrarFormulario && (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="text"
                name="nombre_plato"
                className="form-control"
                placeholder="Nombre del plato"
                value={nuevoPlato.nombre_plato}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                className="form-control"
                placeholder="Descripción"
                value={nuevoPlato.descripcion}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                step="0.01"
                name="precio"
                className="form-control"
                placeholder="Precio"
                value={nuevoPlato.precio}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-success">Guardar</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
