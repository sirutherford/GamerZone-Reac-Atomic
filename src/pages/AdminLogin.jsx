import React, { useState } from 'react';

const AdminLogin = ({ alAutenticar, volverATienda }) => {
  const [credenciales, setCredenciales] = useState({
    usuario: '',
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
    const inputUser = credenciales.usuario.trim().toLowerCase();
    const inputPass = credenciales.password;

    let adminEncontrado = null;

    // Buscar en todas las listas posibles de usuarios guardados
    try {
      const posiblesClaves = ['usuariosGamerZone', 'usuarios', 'users', 'cuentas', 'adminsGamerZone'];
      
      for (let clave of posiblesClaves) {
        const dataLocal = localStorage.getItem(clave);
        if (dataLocal) {
          const usuarios = JSON.parse(dataLocal);
          if (Array.isArray(usuarios)) {
            adminEncontrado = usuarios.find(u => {
              // 1. Validar Usuario / Correo / Nombre
              const emailVal = (u.email || '').toLowerCase();
              const nombreVal = (u.nombre || '').toLowerCase();
              const userVal = (u.usuario || '').toLowerCase();
              const coincidenciaUsuario = emailVal === inputUser || nombreVal === inputUser || userVal === inputUser;

              // 2. Validar Contraseña (password, clave, pass, contraseña)
              const passGuardada = u.password || u.clave || u.pass || u.contraseña;
              const coincidenciaPass = passGuardada === inputPass;

              // 3. Validar Rol de Administrador
              const rolVal = (u.rol || u.role || u.tipo || '').toLowerCase();
              const esRolAdmin = rolVal === 'admin' || rolVal === 'administrador' || u.esAdmin === true;

              return coincidenciaUsuario && coincidenciaPass && esRolAdmin;
            });
          }
        }
        if (adminEncontrado) break;
      }
    } catch (err) {
      console.error('Error al leer usuarios:', err);
    }

    // Administrador por defecto si no se encuentra en las listas dinámicas
    if (!adminEncontrado && (inputUser === 'admin@gamerzone.cl' || inputUser === 'admin') && inputPass === 'admin123') {
      adminEncontrado = { 
        email: 'admin@gamerzone.cl', 
        nombre: 'Admin Principal', 
        rol: 'admin', 
        esAdmin: true 
      };
    }

    if (adminEncontrado) {
      // Normalizar datos de sesión
      const datosSesion = {
        ...adminEncontrado,
        nombre: adminEncontrado.nombre || adminEncontrado.usuario || adminEncontrado.email,
        email: adminEncontrado.email || adminEncontrado.usuario,
        rol: 'admin',
        esAdmin: true
      };

      localStorage.setItem('adminAutenticadoGamerZone', 'true');
      localStorage.setItem('usuarioGamerZone', JSON.stringify(datosSesion));

      if (alAutenticar) alAutenticar(datosSesion);
    } else {
      setError('⛔ Credenciales incorrectas o el usuario no tiene permisos de administrador.');
    }
  };

  const handleVolver = () => {
    if (volverATienda) volverATienda('home');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0f1d',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1f293d',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '36px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🛡️</div>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', color: '#ffffff' }}>
            Gamer<span style={{ color: '#0070f3' }}>Zone</span> Admin
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '6px' }}>
            Acceso restringido para personal autorizado
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#f87171',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
              Usuario o Correo Administrador
            </label>
            <input 
              type="text" 
              name="usuario"
              value={credenciales.usuario} 
              onChange={handleChange}
              placeholder="gamerzone@gmail.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              value={credenciales.password} 
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              marginTop: '8px',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#0070f3',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 14px rgba(0, 112, 243, 0.4)'
            }}
          >
            Ingresar al Panel
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={handleVolver}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;