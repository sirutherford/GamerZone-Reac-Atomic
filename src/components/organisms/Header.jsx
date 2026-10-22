import React, { useState } from 'react';
import Boton from '../atoms/Boton';

const Header = ({ cantidadCarrito, abrirCarrito, seccionActiva, navegarA, usuario, cerrarSesion, alIngresarAdmin }) => {
  const [mostrarMenuNosotros, setMostrarMenuNosotros] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);

  // Extraer únicamente el primer nombre del usuario
  const primerNombre = typeof usuario === 'string' && usuario.trim()
    ? usuario.trim().split(' ')[0]
    : (usuario?.nombre ? usuario.nombre.trim().split(' ')[0] : 'Usuario');

  // Identificar si la cuenta es de Administrador (por nombre, correo o propiedad esAdmin)
  const esAdmin = typeof usuario === 'string' 
    ? usuario.toLowerCase().includes('admin') 
    : (usuario?.email?.toLowerCase().includes('admin') || usuario?.esAdmin || usuario?.nombre?.toLowerCase().includes('admin'));

  const handleClicAdmin = (e) => {
    e.preventDefault();
    if (typeof alIngresarAdmin === 'function') {
      alIngresarAdmin();
    } else {
      navegarA('admin');
    }
  };

  // Color celeste armonioso para la pestaña donde está situado el usuario
  const COLOR_CELESTE_ACTIVO = '#38bdf8';

  return (
    <>
      {/* Estilos para el efecto Celeste Neón en Hover y animación suave */}
      <style>{`
        .nav-link-neon {
          background: none;
          border: none;
          font-size: 0.95rem;
          transition: color 0.25s ease, text-shadow 0.25s ease, transform 0.2s ease;
        }
        .nav-link-neon:hover {
          color: #00f0ff !important;
          text-shadow: 0 0 8px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.7);
          transform: translateY(-1px);
        }
      `}</style>

      <header style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navegarA('home')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px', color: '#ffffff' }}>
            GAMER<span style={{ color: COLOR_CELESTE_ACTIVO }}>ZONE</span>
          </span>
        </div>

        {/* Navegación principal */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            className="nav-link-neon"
            onClick={() => navegarA('home')}
            style={{
              color: seccionActiva === 'home' ? COLOR_CELESTE_ACTIVO : '#cbd5e1',
              fontWeight: seccionActiva === 'home' ? '700' : '500',
              textShadow: seccionActiva === 'home' ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
              cursor: 'pointer'
            }}
          >
            Home
          </button>

          <button 
            className="nav-link-neon"
            onClick={() => navegarA('productos')}
            style={{
              color: seccionActiva === 'productos' ? COLOR_CELESTE_ACTIVO : '#cbd5e1',
              fontWeight: seccionActiva === 'productos' ? '700' : '500',
              textShadow: seccionActiva === 'productos' ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
              cursor: 'pointer'
            }}
          >
            Productos
          </button>

          {/* Menú Desplegable Nosotros */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setMostrarMenuNosotros(true)}
            onMouseLeave={() => setMostrarMenuNosotros(false)}
          >
            <button 
              className="nav-link-neon"
              onClick={() => navegarA('nosotros', 'sobre-gamerzone')}
              style={{
                color: seccionActiva === 'nosotros' ? COLOR_CELESTE_ACTIVO : '#cbd5e1',
                fontWeight: seccionActiva === 'nosotros' ? '700' : '500',
                textShadow: seccionActiva === 'nosotros' ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
                cursor: 'pointer'
              }}
            >
              Nosotros ∨
            </button>

            {mostrarMenuNosotros && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                padding: '8px 0',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                minWidth: '130px',
                zIndex: 100,
                border: '1px solid #334155'
              }}>
                <button 
                  onClick={() => { setMostrarMenuNosotros(false); navegarA('nosotros', 'sobre-gamerzone'); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.85rem' }}
                  className="nav-link-neon"
                >
                  GamerZone
                </button>
                <button 
                  onClick={() => { setMostrarMenuNosotros(false); navegarA('nosotros', 'equipo-gz'); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.85rem' }}
                  className="nav-link-neon"
                >
                  Equipo GZ
                </button>
              </div>
            )}
          </div>

          <button 
            className="nav-link-neon"
            onClick={() => navegarA('home', 'blogs')}
            style={{
              color: seccionActiva === 'blogs' ? COLOR_CELESTE_ACTIVO : '#cbd5e1',
              fontWeight: seccionActiva === 'blogs' ? '700' : '500',
              textShadow: seccionActiva === 'blogs' ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
              cursor: 'pointer'
            }}
          >
            Blogs
          </button>

          <button 
            className="nav-link-neon"
            onClick={() => navegarA('home', 'contacto')}
            style={{
              color: seccionActiva === 'contacto' ? COLOR_CELESTE_ACTIVO : '#cbd5e1',
              fontWeight: seccionActiva === 'contacto' ? '700' : '500',
              textShadow: seccionActiva === 'contacto' ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
              cursor: 'pointer'
            }}
          >
            Contacto
          </button>
        </nav>

        {/* Acciones de Usuario / Admin y Carrito */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {usuario ? (
            <div 
              style={{ position: 'relative', padding: '10px 0' }}
              onMouseEnter={() => setMostrarMenuUsuario(true)}
              onMouseLeave={() => setMostrarMenuUsuario(false)}
            >
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: COLOR_CELESTE_ACTIVO,
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                {esAdmin ? 'Admin' : `Hola, ${primerNombre}`} <span style={{ fontSize: '0.75rem', color: COLOR_CELESTE_ACTIVO }}>∨</span>
              </button>

              {mostrarMenuUsuario && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#1e293b',
                  borderRadius: '10px',
                  padding: '8px 0',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                  minWidth: '175px',
                  zIndex: 100,
                  border: '1px solid #334155'
                }}>
                  {esAdmin && (
                    <>
                      <button 
                        onClick={() => {
                          setMostrarMenuUsuario(false);
                          navegarA('admin');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          color: COLOR_CELESTE_ACTIVO,
                          cursor: 'pointer',
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        🛠️ Ir al Panel Admin
                      </button>
                      <div style={{ height: '1px', backgroundColor: '#334155', margin: '4px 0' }} />
                    </>
                  )}

                  <button 
                    onClick={() => {
                      setMostrarMenuUsuario(false);
                      navegarA('historial');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    📦 Mis Compras
                  </button>

                  <button 
                    onClick={() => {
                      setMostrarMenuUsuario(false);
                      navegarA('configuracion');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ⚙️ Configuración
                  </button>

                  <div style={{ height: '1px', backgroundColor: '#334155', margin: '4px 0' }} />

                  <button 
                    onClick={() => {
                      setMostrarMenuUsuario(false);
                      cerrarSesion();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Salir
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              <button 
                onClick={() => navegarA('login')}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                className="nav-link-neon"
              >
                Iniciar sesión
              </button>
              <span style={{ color: '#475569' }}>|</span>
              <button 
                onClick={() => navegarA('registro')}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                className="nav-link-neon"
              >
                Registrar usuario
              </button>
              <span style={{ color: '#475569' }}>|</span>
              <button 
                type="button"
                onClick={handleClicAdmin}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                className="nav-link-neon"
              >
                Admin
              </button>
            </div>
          )}

          {/* Botón Carrito */}
          <Boton
            onClick={abrirCarrito}
            style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            🛒 Cart ( {cantidadCarrito} )
          </Boton>
        </div>
      </header>
    </>
  );
};

export default Header;