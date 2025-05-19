import React, { useState, useEffect } from 'react';
import axiosCliente from './AxiosCliente';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) setUsuario(user);
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    try {
      const res = await axiosCliente.get('/comentarios');
      setComentarios(res.data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const enviarComentario = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario) {
      setError('Debes iniciar sesión para comentar.');
      return;
    }

    try {
      const res = await axiosCliente.post('/comentarios', {
        usuario_id: usuario.id_usuario,
        contenido: contenido
      });

      setComentarios([res.data.comentario, ...comentarios]);
      setContenido('');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(' '));
      } else {
        setError('Error al enviar comentario.');
      }
    }
  };

  const eliminarComentario = async (id) => {
    try {
      await axiosCliente.delete(`/comentarios/${id}`);
      setComentarios(comentarios.filter(c => c.id !== id));
    } catch (err) {
      alert('❌ No tienes permiso para eliminar este comentario.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💬 Comentarios ({comentarios.length})</h2>

      {usuario ? (
        <form onSubmit={enviarComentario} className="mb-4">
          <div className="mb-3">
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="form-control"
              rows="3"
              placeholder="Escribe tu comentario..."
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      ) : (
        <p className="text-muted text-center mb-4">
          🔒 Debes <a href="/login">iniciar sesión</a> para comentar.
        </p>
      )}

      <ul className="list-group">
  {comentarios.map((comentario) => (
    <li
      key={comentario.id}
      className="list-group-item mb-3"
      style={{ borderRadius: '0.5rem', boxShadow: '0 0 4px rgba(0,0,0,0.1)' }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <strong>{comentario.usuario?.nombre || 'Usuario'}:</strong>
          <p className="mb-1 mt-1">{comentario.contenido}</p>
          <small className="text-muted">
            {new Date(comentario.created_at).toLocaleString()}
          </small>
        </div>
        {(usuario && (comentario.usuario_id === usuario.id_usuario || usuario.rol === 'admin')) && (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => eliminarComentario(comentario.id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Comentarios;
