import React from 'react';

const Carrito = ({ carrito, cerrarCarrito, eliminarDelCarrito }) => {
  // Calculamos el costo total acumulado
  const total = carrito.reduce((acc, producto) => {
    // Convierte "$54.990" a número entero (54990)
    const precioNumerico = parseInt(producto.precio.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + precioNumerico * producto.cantidad;
  }, 0);

  return (
    <div className="modal-overlay" onClick={cerrarCarrito}>
      <div className="modal-carrito" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🛒 Tu Carrito de Compras</h3>
          <button className="btn-cerrar" onClick={cerrarCarrito}>✕</button>
        </div>

        <div className="modal-body">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío por ahora.</p>
          ) : (
            <ul className="lista-carrito">
              {carrito.map((item) => (
                <li key={item.id} className="item-carrito">
                  <img src={item.imagen} alt={item.titulo} />
                  <div className="info-item">
                    <h5>{item.titulo}</h5>
                    <p className="detalles-item">
                      {item.precio} x <strong>{item.cantidad}</strong>
                    </p>
                  </div>
                  <button 
                    className="btn-eliminar" 
                    onClick={() => eliminarDelCarrito(item.id)}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {carrito.length > 0 && (
          <div className="modal-footer">
            <div className="total-compra">
              <span>Total:</span>
              <strong>${total.toLocaleString('es-CL')}</strong>
            </div>
            <button className="btn-primary btn-pagar">Finalizar Compra</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
