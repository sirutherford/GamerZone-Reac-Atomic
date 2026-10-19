import React, { useState } from 'react';

const Header = ({ cantidadCarrito = 0, abrirCarrito, seccionActiva, navegarA, usuario, cerrarSesion }) => {
  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

  const irA = (e, vista, seccion = null) => {
    e.preventDefault();
    if (navegarA) navegarA(vista, seccion);
  };

  return (
    <header style={{
      backgroundColor: '#0b0f19',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #1f2937',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '64px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        padding: '0 28px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px' // <-- Esto asegura que NUNCA se peguen el menú central y la parte derecha
      }}>
        
        {/* LOGO AMPLIADO */}
        <div 
          onClick={(e) => irA(e, 'home')} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <img 
            src="/img/LogotipoGZfuturista.png" 
            alt="GamerZone Logo" 
            style={{ 
              height: '48px', 
              width: 'auto', 
              display: 'block',
              objectFit: 'contain'
            }} 
          />
        </div>

        {/* NAVEGACIÓN CENTRADA (MÁS JUNTOS) */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', // <-- Redujimos el gap para que Hogar, Productos, etc., estén más juntos
          flexWrap: 'nowrap'
        }}>
          <a 
            href="#" 
            onClick={(e) => irA(e, 'home')}
            style={{
              color: seccionActiva === 'home' ? '#00d2ff' : '#e5e7eb',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.92rem',
              whiteSpace: 'nowrap'
            }}
          >
            Hogar
          </a>

          <a 
            href="#productos" 
            onClick={(e) => irA(e, 'productos')}
            style={{
              color: seccionActiva === 'productos' ? '#00d2ff' : '#e5e7eb',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.92rem',
              whiteSpace: 'nowrap'
            }}
          >
            Productos
          </a>

          {/* Menú Desplegable "Nosotros" */}
          <div 
            style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
            onMouseEnter={() => setMostrarSubmenu(true)}
            onMouseLeave={() => setMostrarSubmenu(false)}
          >
            <a 
              href="#nosotros" 
              onClick={(e) => irA(e, 'nosotros')}
              style={{
                color: seccionActiva === 'nosotros' ? '#00d2ff' : '#e5e7eb',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              Nosotros <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
            </a>

            {mostrarSubmenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                padding: '6px 0',
                minWidth: '150px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <a 
                  href="#sobre-gamerzone" 
                  onClick={(e) => { 
                    setMostrarSubmenu(false); 
                    irA(e, 'nosotros', 'sobre-gamerzone'); 
                  }}
                  style={{
                    padding: '8px 16px',
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                  }}
                  onMouseEnter={(e) => { e.target.style.color = '#00d2ff'; e.target.style.backgroundColor = '#1f2937'; }}
                  onMouseLeave={(e) => { e.target.style.color = '#d1d5db'; e.target.style.backgroundColor = 'transparent'; }}
                >
                  GamerZone
                </a>
                <a 
                  href="#equipo-gz" 
                  onClick={(e) => { 
                    setMostrarSubmenu(false); 
                    irA(e, 'nosotros', 'equipo-gz'); 
                  }}
                  style={{
                    padding: '8px 16px',
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                  }}
                  onMouseEnter={(e) => { e.target.style.color = '#00d2ff'; e.target.style.backgroundColor = '#1f2937'; }}
                  onMouseLeave={(e) => { e.target.style.color = '#d1d5db'; e.target.style.backgroundColor = 'transparent'; }}
                >
                  Equipo GZ
                </a>
              </div>
            )}
          </div>

          <a 
            href="#blogs" 
            onClick={(e) => irA(e, 'blogs')}
            style={{
              color: seccionActiva === 'blogs' ? '#00d2ff' : '#e5e7eb',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.92rem',
              whiteSpace: 'nowrap'
            }}
          >
            Blogs
          </a>

          <a 
            href="#contacto" 
            onClick={(e) => irA(e, 'contacto')}
            style={{
              color: seccionActiva === 'contacto' ? '#00d2ff' : '#e5e7eb',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.92rem',
              whiteSpace: 'nowrap'
            }}
          >
            Contacto
          </a>
        </nav>

        {/* USUARIO Y CARRITO EN LA EXTREMA DERECHA */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          flexShrink: 0 
        }}>
          {usuario ? (
            <span style={{ color: '#00d2ff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              Hola, {usuario} 
              <button 
                onClick={cerrarSesion} 
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Salir
              </button>
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              <a href="#" onClick={(e) => irA(e, 'login')} style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                Iniciar sesión
              </a>
              <span style={{ color: '#4b5563' }}>|</span>
              <a href="#" onClick={(e) => irA(e, 'registro')} style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                Registrar usuario
              </a>
            </div>
          )}

          <button 
            onClick={abrirCarrito}
            style={{
              backgroundColor: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
              padding: '7px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap'
            }}
          >
            <i className="fas fa-shopping-cart"></i> Cart ( {cantidadCarrito} )
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;