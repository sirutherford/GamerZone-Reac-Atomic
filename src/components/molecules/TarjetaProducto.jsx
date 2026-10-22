import React from 'react';
import Boton from '../atoms/Boton';

const TarjetaProducto = ({ producto, agregarAlCarrito, verDetalle }) => {
  // Formateador para asegurar el signo $ y el punto separador de miles
  const formatPrecio = (precio) => {
    if (!precio && precio !== 0) return '';
    
    // Quitamos cualquier caracter que no sea número (letras, puntos viejos, signos $)
    const soloNumeros = String(precio).replace(/\D/g, '');
    
    // Lo convertimos a número y le aplicamos el formato chileno, agregando el $
    return `$${Number(soloNumeros).toLocaleString('es-CL')}`;
  };

  return (
    <div className="card-producto">
      {/* Imagen clickeable */}
      <div 
        className="producto-img-container" 
        onClick={() => verDetalle && verDetalle(producto)}
        style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}
      >
        <img 
          src={producto.imagen} 
          alt={producto.titulo || producto.nombre} 
          style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }}
        />
      </div>

      {/* Título clickeable */}
      <h4 
        onClick={() => verDetalle && verDetalle(producto)}
        style={{ cursor: 'pointer', marginTop: '12px', marginBottom: '6px' }}
      >
        {producto.titulo || producto.nombre}
      </h4>

      {/* Badge de Plataforma */}
      {producto.plataforma && (
        <span 
          className="badge" 
          style={{ 
            display: 'inline-block',
            backgroundColor: '#0f172a',
            color: '#38bdf8',
            border: '1px solid #1e293b',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '8px'
          }}
        >
          {producto.plataforma}
        </span>
      )}

      {/* Precio verde neón */}
      <p className="precio" style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem', margin: '8px 0' }}>
        {formatPrecio(producto.precio)}
      </p>

      {/* Acciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        <Boton className="btn-primary" onClick={() => agregarAlCarrito(producto)}>
          Añadir al carrito
        </Boton>

        {verDetalle && (
          <Boton 
            type="button" 
            onClick={() => verDetalle(producto)}
            style={{ 
              backgroundColor: '#eff6ff', 
              color: '#0070f3', 
              border: '1.5px solid #0070f3',
              borderRadius: '8px',
              padding: '9px 12px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 112, 243, 0.08)'
            }}
          >
            Ver detalle 🔍
          </Boton>
        )}
      </div>
    </div>
  );
};

export default TarjetaProducto;