import React from 'react';

const Equipo = () => {
  // Datos actualizados del equipo de GamerZone
  const integrantes = [
    { nombre: 'Simon Rutherford', rol: 'Desarrollador Frontend', avatar: '💻' },
    { nombre: 'Benjamin Salinas', rol: 'Desarrollador Backend', avatar: '⚙️' },
    { nombre: 'Dylan Misetich', rol: 'Diseñador UI/UX', avatar: '🎨' }
  ];

  return (
    <section className="seccion-equipo" style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Nuestro Equipo</h2>
      <p style={{ color: '#00d2ff', marginBottom: '50px', fontSize: '1.1rem' }}>
        Conoce a los creadores detrás de GamerZone
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {integrantes.map((miembro, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#111827', 
              padding: '30px', 
              borderRadius: '12px', 
              width: '260px', 
              border: '1px solid #1f2937',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s, border-color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = '#00d2ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: '#1f2937', 
              margin: '0 auto 20px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              border: '2px solid #00d2ff'
            }}>
               {miembro.avatar}
            </div>
            <h3 style={{ margin: '10px 0', fontSize: '1.3rem', color: '#fff' }}>{miembro.nombre}</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>{miembro.rol}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Equipo;