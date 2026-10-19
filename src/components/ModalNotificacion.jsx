import React from 'react';

const ModalNotificacion = ({ titulo, mensaje, alCerrar }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (alCerrar) alCerrar();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon">✨</div>
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <button type="button" className="btn-primary btn-modal" onClick={handleClick}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ModalNotificacion;