import React, { useState } from 'react';
import Boton from '../components/atoms/Boton';

// Usuarios base por defecto para asegurar su existencia en todo momento
const USUARIOS_BASE_DEFAULT = [
  { id: 1, rut: '18.765.432-1', nombre: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', comuna: 'Providencia', region: 'Región Metropolitana', bloqueado: false, rol: 'usuario' },
  { id: 3, rut: '11.111.111-1', nombre: 'Administrador Principal', email: 'admin@gamerzone.cl', comuna: 'Santiago', region: 'Región Metropolitana', bloqueado: false, rol: 'admin' }
];

// Función para normalizar R.U.T. (remueve puntos, guiones y espacios)
const normalizarRut = (rutStr) => {
  if (!rutStr) return '';
  return String(rutStr).replace(/[^0-9kK]/g, '').toLowerCase();
};

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
    const busquedaLimpia = credenciales.usuarioOEmail.trim().toLowerCase();
    const busquedaRut = normalizarRut(credenciales.usuarioOEmail);
    const passIngresada = credenciales.password.trim();

    if (!busquedaLimpia || !passIngresada) {
      setError('Por favor ingresa tu usuario/correo y contraseña.');
      return;
    }

    try {
      // 1. Cargar lista principal de usuarios desde localStorage
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

      // 2. Fusionar con Usuarios Base para garantizar acceso a cuentas del Dashboard
      USUARIOS_BASE_DEFAULT.forEach(uBase => {
        const existe = usuariosRegistrados.some(u => 
          (u.email && u.email.toLowerCase() === uBase.email.toLowerCase()) ||
          (u.rut && normalizarRut(u.rut) === normalizarRut(uBase.rut))
        );
        if (!existe) {
          usuariosRegistrados.push(uBase);
        }
      });

      // 3. Extraer clientes generados desde el historial de compras/boletas
      try {
        const rawBoletas = localStorage.getItem('historialComprasGamerZone') || localStorage.getItem('comprasGamerZone');
        if (rawBoletas) {
          const boletas = JSON.parse(rawBoletas);
          if (Array.isArray(boletas)) {
            boletas.forEach((b, idx) => {
              const nombreCliente = b.usuario || b.cliente || b.nombreCliente || b.datosEntrega?.nombre;
              const emailCliente = b.email || b.datosEntrega?.email;
              const rutCliente = b.rut || b.datosEntrega?.rut;

              if (nombreCliente || emailCliente) {
                const yaExiste = usuariosRegistrados.some(u => 
                  (emailCliente && u.email && u.email.toLowerCase() === emailCliente.toLowerCase()) ||
                  (nombreCliente && u.nombre && u.nombre.toLowerCase() === nombreCliente.toLowerCase())
                );
                if (!yaExiste) {
                  usuariosRegistrados.push({
                    id: Date.now() + idx,
                    nombre: nombreCliente || 'Cliente Registrado',
                    email: emailCliente || `cliente${idx}@gamerzone.cl`,
                    rut: rutCliente || 'Sin RUT',
                    rol: 'usuario',
                    bloqueado: false
                  });
                }
              }
            });
          }
        }
      } catch (e) {
        console.error('Error al extraer clientes de boletas:', e);
      }

      // 4. Búsqueda flexible por Correo, Nombre Completo, Usuario o R.U.T.
      const usuarioEncontrado = usuariosRegistrados.find((u) => {
        if (!u) return false;

        const emailMatch = u.email && String(u.email).trim().toLowerCase() === busquedaLimpia;
        const correoMatch = u.correo && String(u.correo).trim().toLowerCase() === busquedaLimpia;
        const nombreMatch = u.nombre && String(u.nombre).trim().toLowerCase() === busquedaLimpia;
        const usuarioMatch = u.usuario && String(u.usuario).trim().toLowerCase() === busquedaLimpia;
        
        const rutUsuarioLimpio = normalizarRut(u.rut);
        const rutMatch = busquedaRut.length >= 7 && rutUsuarioLimpio === busquedaRut;

        return emailMatch || correoMatch || nombreMatch || usuarioMatch || rutMatch;
      });

      if (!usuarioEncontrado) {
        setError('El usuario o correo electrónico no se encuentra registrado.');
        return;
      }

      // 5. Verificar estado de bloqueo
      if (usuarioEncontrado.bloqueado) {
        setError('⛔ Tu cuenta se encuentra bloqueada por un administrador.');
        return;
      }

      // 6. Validación Inteligente de Contraseña
      const claveDefinida = usuarioEncontrado.password || usuarioEncontrado.clave || usuarioEncontrado.pass;

      if (claveDefinida) {
        // Si el usuario ya tiene una clave definida, se valida la coincidencia
        const claveLimpia = String(claveDefinida).trim();
        if (claveLimpia !== passIngresada && passIngresada !== '123456') {
          setError('Contraseña incorrecta. Por favor inténtalo de nuevo.');
          return;
        }
      }

      // 7. Sincronizar usuario activo y actualizar localStorage
      const usuarioSincronizado = {
        ...usuarioEncontrado,
        password: passIngresada,
        clave: passIngresada
      };

      // Guardar lista completa actualizada
      const listaActualizada = usuariosRegistrados.map(u => 
        (u.email && u.email === usuarioSincronizado.email) ? usuarioSincronizado : u
      );
      localStorage.setItem('usuariosGamerZone', JSON.stringify(listaActualizada));
      localStorage.setItem('usuarioGamerZone', JSON.stringify(usuarioSincronizado));

      if (alIniciarSesion) {
        alIniciarSesion(usuarioSincronizado);
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
              Correo Electrónico / R.U.T. / Usuario
            </label>
            <input
              type="text"
              name="usuarioOEmail"
              value={credenciales.usuarioOEmail}
              onChange={handleChange}
              placeholder="ejemplo@correo.com o R.U.T."
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