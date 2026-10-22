import React, { useState } from 'react';
import ModalConfirmarDireccion from '../molecules/ModalConfirmarDireccion';
import ModalAuthRequerido from '../molecules/ModalAuthRequerido';
import ModalBoleta from '../molecules/ModalBoleta';

const Carrito = ({ 
  carrito, 
  cerrarCarrito, 
  eliminarDelCarrito, 
  usuario, 
  irALogin, 
  irARegistro, 
  vaciarCarrito 
}) => {
  const [mostrarModalAuth, setMostrarModalAuth] = useState(false);
  const [mostrarConfirmarDireccion, setMostrarConfirmarDireccion] = useState(false);
  const [ordenEmitida, setOrdenEmitida] = useState(null);

  const parsePrecio = (precioStr) => {
    return parseInt(String(precioStr).replace(/[^0-9]/g, ''), 10) || 0;
  };

  const total = carrito.reduce((acc, producto) => {
    return acc + parsePrecio(producto.precio) * producto.cantidad;
  }, 0);

  const handleFinalizarCompra = () => {
    if (carrito.length === 0) return;

    if (!usuario) {
      setMostrarModalAuth(true);
      return;
    }

    setMostrarConfirmarDireccion(true);
  };

  const handleIrALogin = () => {
    setMostrarModalAuth(false);
    cerrarCarrito();
    if (irALogin) irALogin();
  };

  const handleIrARegistro = () => {
    setMostrarModalAuth(false);
    cerrarCarrito();
    if (irARegistro) irARegistro();
  };

  const handleConfirmarPedido = (datosEntrega) => {
    setMostrarConfirmarDireccion(false);

    // 1. Actualizar dirección del usuario en localStorage
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioGamerZone')) || {};
      localStorage.setItem('usuarioGamerZone', JSON.stringify({
        ...usuarioGuardado,
        direccion: datosEntrega.direccion,
        region: datosEntrega.region,
        comuna: datosEntrega.comuna
      }));
    } catch (e) {
      console.error(e);
    }

    // 2. DESCUENTO AUTOMÁTICO DE STOCK EN LOCALSTORAGE
    try {
      const productosGuardados = JSON.parse(localStorage.getItem('productosGamerZone')) || [];
      if (productosGuardados.length > 0) {
        const productosActualizados = productosGuardados.map((prod) => {
          const itemEnCarrito = carrito.find((item) => item.id === prod.id || item.codigo === prod.codigo);
          if (itemEnCarrito) {
            const stockActual = Number(prod.stock) || 0;
            const nuevoStock = Math.max(0, stockActual - itemEnCarrito.cantidad);
            return { ...prod, stock: nuevoStock };
          }
          return prod;
        });

        localStorage.setItem('productosGamerZone', JSON.stringify(productosActualizados));
      }
    } catch (e) {
      console.error('Error al descontar stock en localStorage:', e);
    }

    // 3. Nombre del cliente limpio para guardar
    const nombreCliente = typeof usuario === 'object' ? (usuario.nombre || usuario.email) : usuario;

    // 4. Generar datos de la boleta
    const nuevaOrden = {
      numBoleta: Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toLocaleDateString('es-CL') + ' ' + new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      usuario: nombreCliente || 'Cliente GamerZone',
      productos: [...carrito],
      total: total,
      datosEntrega: datosEntrega
    };

    // 5. Guardar la compra en el historial persistente
    try {
      const historialPrevio = JSON.parse(localStorage.getItem('historialComprasGamerZone')) || [];
      const nuevoHistorial = [nuevaOrden, ...historialPrevio];
      localStorage.setItem('historialComprasGamerZone', JSON.stringify(nuevoHistorial));
    } catch (e) {
      console.error('Error al guardar compra en historial:', e);
    }

    setOrdenEmitida(nuevaOrden);
  };

  const handleCerrarBoleta = () => {
    setOrdenEmitida(null);
    if (vaciarCarrito) vaciarCarrito();
    cerrarCarrito();
  };

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
                  <img src={item.imagen} alt={item.titulo || item.nombre} />
                  <div className="info-item">
                    <h4>{item.titulo || item.nombre}</h4>
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
            <button className="btn-primary btn-pagar" onClick={handleFinalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {mostrarModalAuth && (
        <ModalAuthRequerido
          alIrALogin={handleIrALogin}
          alIrARegistro={handleIrARegistro}
          alCerrar={() => setMostrarModalAuth(false)}
        />
      )}

      {mostrarConfirmarDireccion && (
        <ModalConfirmarDireccion
          total={total}
          alConfirmar={handleConfirmarPedido}
          alCancelar={() => setMostrarConfirmarDireccion(false)}
        />
      )}

      {ordenEmitida && (
        <ModalBoleta
          orden={ordenEmitida}
          alFinalizar={handleCerrarBoleta}
        />
      )}
    </div>
  );
};

export default Carrito;