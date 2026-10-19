import React from 'react';

const Nosotros = () => {
  const integrantes = [
    { nombre: 'Simon Rutherford', rol: 'Desarrollador Frontend', avatar: '💻' },
    { nombre: 'Benjamin Salinas', rol: 'Desarrollador Backend', avatar: '⚙️' },
    { nombre: 'Dylan Misetich', rol: 'Diseñador UI/UX', avatar: '🎨' }
  ];

  return (
    <section className="seccion-nosotros" id="nosotros" style={{ backgroundColor: '#f8fafc', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 1. SECCIÓN SOBRE GAMERZONE */}
        <div id="sobre-gamerzone" style={{ paddingTop: '25px', paddingBottom: '20px', scrollMarginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Sobre GamerZone
            </h2>
            <div style={{ width: '45px', height: '4px', backgroundColor: '#00d2ff', margin: '6px auto 0 auto', borderRadius: '2px' }}></div>
          </div>

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 22px auto', lineHeight: '1.45' }}>
            Somos el punto de encuentro definitivo para gamers apasionados. Tu tienda de confianza para los mejores títulos de consola y PC.
          </p>

          {/* Tarjetas Misión, Entrega y Garantía */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '22px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #00d2ff',
              borderRadius: '16px',
              padding: '22px 18px',
              textAlign: 'center',
              boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎮</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Nuestra Misión</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.4', margin: 0 }}>
                Brindar a la comunidad gamer acceso rápido, seguro y al mejor precio a las últimas novedades y clásicos del mundo de los videojuegos.
              </p>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #00d2ff',
              borderRadius: '16px',
              padding: '22px 18px',
              textAlign: 'center',
              boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚀</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Entrega Inmediata</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.4', margin: 0 }}>
                Recibe tus códigos digitales y juegos de forma instantánea tras confirmar tu compra, sin esperas ni complicaciones.
              </p>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #00d2ff',
              borderRadius: '16px',
              padding: '22px 18px',
              textAlign: 'center',
              boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Garantía y Soporte</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.4', margin: 0 }}>
                Todas nuestras licencias son 100% oficiales y contamos con soporte técnico dedicado para resolver cualquier inquietud.
              </p>
            </div>
          </div>

          {/* Bloque Estadísticas Oscuro */}
          <div style={{
            backgroundColor: '#0f172a',
            borderRadius: '16px',
            padding: '22px 18px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#00d2ff', margin: 0 }}>+10.000</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Gamers Satisfechos</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#00d2ff', margin: 0 }}>+500</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Juegos en Catálogo</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#00d2ff', margin: 0 }}>24/7</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Soporte Atento</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#00d2ff', margin: 0 }}>100%</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Licencias Oficiales</p>
            </div>
          </div>
        </div>

        {/* 2. SECCIÓN EQUIPO GZ (ESPACIADO NATURAL Y CONTINUO) */}
        <div 
          id="equipo-gz" 
          style={{ 
            paddingTop: '45px',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Equipo GZ
            </h2>
            <div style={{ width: '45px', height: '4px', backgroundColor: '#00d2ff', margin: '6px auto 0 auto', borderRadius: '2px' }}></div>
          </div>

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.98rem', margin: '0 auto 28px auto' }}>
            Conoce a los creadores detrás de la plataforma
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {integrantes.map((miembro, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: '#0f172a', 
                  padding: '30px 20px', 
                  borderRadius: '16px', 
                  width: '250px', 
                  textAlign: 'center',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s, border-color 0.3s',
                  border: '1px solid #1e293b'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#00d2ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#1e293b';
                }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1e293b', 
                  margin: '0 auto 16px auto', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.7rem',
                  border: '2px solid #00d2ff'
                }}>
                  {miembro.avatar}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '700', margin: '0 0 6px 0' }}>{miembro.nombre}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{miembro.rol}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Nosotros;