import React from 'react';
import TarjetaIntegrante from '../components/molecules/TarjetaIntegrante';
import TarjetaInfoNosotros from '../components/molecules/TarjetaInfoNosotros';

const Nosotros = () => {
  const integrantes = [
    { nombre: 'Simon Rutherford', rol: 'Desarrollador Frontend', avatar: '💻' },
    { nombre: 'Benjamin Salinas', rol: 'Desarrollador Backend', avatar: '⚙️' },
    { nombre: 'Dylan Misetich', rol: 'Diseñador UI/UX', avatar: '🎨' }
  ];

  const infoTarjetas = [
    {
      icono: '🎮',
      titulo: 'Nuestra Misión',
      descripcion: 'Brindar a la comunidad gamer acceso rápido, seguro y al mejor precio a las últimas novedades y clásicos del mundo de los videojuegos.'
    },
    {
      icono: '🚀',
      titulo: 'Entrega Inmediata',
      descripcion: 'Recibe tus códigos digitales y juegos de forma instantánea tras confirmar tu compra, sin esperas ni complicaciones.'
    },
    {
      icono: '🛡️',
      titulo: 'Garantía y Soporte',
      descripcion: 'Todas nuestras licencias son 100% oficiales y contamos con soporte técnico dedicado para resolver cualquier inquietud.'
    }
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

          {/* Renderizado mediante la molécula TarjetaInfoNosotros */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '22px' }}>
            {infoTarjetas.map((item, index) => (
              <TarjetaInfoNosotros
                key={index}
                icono={item.icono}
                titulo={item.titulo}
                descripcion={item.descripcion}
              />
            ))}
          </div>

          {/* Bloque Estadísticas */}
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

        {/* 2. SECCIÓN EQUIPO GZ */}
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

          {/* Renderizado mediante la molécula TarjetaIntegrante */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {integrantes.map((miembro, index) => (
              <TarjetaIntegrante
                key={index}
                nombre={miembro.nombre}
                rol={miembro.rol}
                avatar={miembro.avatar}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Nosotros;