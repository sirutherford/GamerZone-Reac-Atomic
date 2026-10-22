import React from 'react';
// Asegúrate de que la ruta coincida con la ubicación de tu molécula
import TarjetaMiembro from '../components/molecules/TarjetaMiembro'; 

const Equipo = () => {
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
          <TarjetaMiembro key={index} miembro={miembro} />
        ))}
      </div>
    </section>
  );
};

export default Equipo;