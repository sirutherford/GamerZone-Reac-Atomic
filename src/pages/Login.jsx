import React, { useState } from 'react';
import Boton from '../components/atoms/Boton';

const Login = ({ irARegistro, alIniciarSesion }) => {
  const [credenciales, setCredenciales] = useState({
    usuarioOEmail: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const busqueda = credenciales.usuarioOEmail.trim().toLowerCase();
    const pass = credenciales.password;

    try {
      // 1. Obtener la lista global de usuarios
      let usuariosRegistrados = [];
      try {
        const rawLista = localStorage.getItem('usuariosGamerZone');
        if (rawLista) usuariosRegistrados = JSON.parse(rawLista);
      } catch (err) {
        console.error('Error al leer usuariosGamerZone:', err);
      }

      if (!Array.isArray(usuariosRegistrados)) {
        usuariosRegistrados = usuariosRegistrados ? [usuariosRegistrados] : [];
      }

      // 2. Incluir también al usuario activo previo si no está en la lista
      try {
        const activo = JSON.parse(localStorage.getItem('usuarioGamerZone'));
        if (activo && typeof activo === 'object') {
          const yaExiste = usuariosRegistrados.some(u => 
            (u.email && u.email.toLowerCase() === (activo.email || '').toLowerCase()) ||
            (u.nombre && u.nombre.toLowerCase() === (activo.nombre || '').toLowerCase())
          );
          if (!yaExiste) {
            usuariosRegistrados.push(activo);
          }
        }
      } catch (err) {
        console.error('Error al leer usuarioGamerZone:', err);
      }

      // 3. Buscar coincidencia por email, correo, nombre, usuario o RUT
      const usuarioEncontrado = usuariosRegistrados.find((u) => {
        const emailMatch = u.email && u.email.trim().toLowerCase() === busqueda;
        const correoMatch = u.correo && u.correo.trim().toLowerCase() === busqueda;
        const nombreMatch = u.nombre && u.nombre.trim().toLowerCase() === busqueda;
        const usuarioMatch = u.usuario && u.usuario.trim().toLowerCase() === busqueda;
        const rutMatch = u.rut && u.rut.trim().toLowerCase() === busqueda;

        return emailMatch || correoMatch || nombreMatch || usuarioMatch || rutMatch;
      });

      // Si no existe el usuario
      if (!usuarioEncontrado) {
        setError('El correo electrónico no está registrado.');
        return;
      }

      // 3.5. VERIFICACIÓN DE CUENTA BLOQUEADA POR EL ADMINISTRADOR
      if (usuarioEncontrado.bloqueado) {
        setError('⛔ Tu cuenta ha sido bloqueada por el administrador. Ponte en contacto con el soporte de GamerZone.');
        return;
      }

      // 4. Verificar la contraseña
      const claveGuardada = usuarioEncontrado.clave || usuarioEncontrado.password;

      if (claveGuardada !== pass) {
        setError('Contraseña incorrecta. Por favor inténtalo de nuevo.');
        return;
      }

      // 5. Sesión exitosa
      localStorage.setItem('usuarioGamerZone', JSON.stringify(usuarioEncontrado));
      
      if (alIniciarSesion) {
        alIniciarSesion(usuarioEncontrado.nombre || usuarioEncontrado.email || usuarioEncontrado.usuario);
      }
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
      setError('Ocurrió un error al procesar el inicio de sesión.');
    }
  };

  const estiloCampo = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '40px 20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        borderTop: '4px solid #00d2ff',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        padding: '36px',
        maxWidth: '420px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a', fontWeight: '800' }}>
            Iniciar Sesión
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>
            Ingresa a tu cuenta de GamerZone
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              Correo Electrónico
            </label>
            <input
              type="text"
              name="usuarioOEmail"
              value={credenciales.usuarioOEmail}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              style={estiloCampo}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={credenciales.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={estiloCampo}
            />
          </div>

          <Boton
            type="submit"
            className="btn-primary"
            style={{
              backgroundColor: '#0070f3',
              color: '#ffffff',
              padding: '13px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              border: 'none',
              marginTop: '8px'
            }}
          >
            Ingresar
          </Boton>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: '#64748b' }}>
          ¿No tienes una cuenta?{' '}
          <button
            onClick={irARegistro}
            style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;