import React from 'react';

const PlantillaPrincipal = ({ children }) => {
  return (
    <main className="plantilla-principal" style={{ minHeight: '80vh' }}>
      {children}
    </main>
  );
};

export default PlantillaPrincipal;