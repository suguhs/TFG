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
    <div className="container mt-5">
      <h2 className="mb-4 d-flex align-items-center">
        <i className="bi bi-chat-dots me-2 fs-4"></i> Comentarios ({comentarios.length})
      </h2>

      {usuario ? (
        <form onSubmit={enviarComentario} className="mb-4">
          <div className="mb-2">
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="form-control"
              rows="3"
              placeholder="Escribe tu comentario..."
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      ) : (
        <div className="alert alert-secondary text-center">
          🔒 <a href="/login">Inicia sesión</a> para dejar un comentario.
        </div>
      )}

      {comentarios.length === 0 ? (
        <p className="text-muted text-center">Aún no hay comentarios.</p>
      ) : (
        <ul className="list-unstyled">
          {comentarios.map((comentario) => (
            <li
              key={comentario.id}
              className="p-3 mb-3 bg-white rounded shadow-sm border"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong className="text-dark">{comentario.usuario?.nombre || 'Usuario'}:</strong>
                  <p className="mb-1 mt-1">{comentario.contenido}</p>
                  <small className="text-muted">
                    {new Date(comentario.created_at).toLocaleString()}
                  </small>
                </div>
                {(usuario && (comentario.usuario_id === usuario.id_usuario || usuario.rol === 'admin')) && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarComentario(comentario.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comentarios;