import React from 'react';

const Boton = ({ children, onClick, type = 'button', className = 'btn-primary' }) => {
  return (
    <button 
      type={type} 
      className={className} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Boton;