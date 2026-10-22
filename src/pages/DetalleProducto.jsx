import React, { useState } from 'react';
import PlantillaPrincipal from '../components/templates/PlantillaPrincipal';
import Boton from '../components/atoms/Boton';
import Input from '../components/atoms/Input';
import ModalNotificacion from '../components/molecules/ModalNotificacion';

const DetalleProducto = ({ producto, alAgregarAlCarrito, volverAProductos }) => {
  const item = producto || {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    plataforma: "Nintendo Switch",
    precio: "$54.990",
    imagen: "/img/The Legend of ZeldaTears of the Kingdom.avif",
    descripcion: "Una aventura épica a través de la tierra y los cielos de Hyrule. Embárcate en una búsqueda para descubrir la verdad detrás del cataclismo que ha sumido al reino en el caos."
  };

  const [cantidad, setCantidad] = useState(1);
  const [modalData, setModalData] = useState(null);

  const formatPrecio = (precio) => {
    if (!precio && precio !== 0) return '';
    const precioStr = String(precio).trim();
    return precioStr.startsWith('$') ? precioStr : `$${precioStr}`;
  };

  const handleCantidadChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setCantidad(val);
    }
  };

  const handleAgregar = () => {
    if (alAgregarAlCarrito) {
      alAgregarAlCarrito(item, cantidad);
    }
    setModalData({
      titulo: '¡Producto Agregado!',
      mensaje: `Añadiste ${cantidad} unidad(es) de "${item.titulo || item.nombre}" al carrito de GamerZone.`
    });
  };

  const tituloMostrar = item.titulo || item.nombre || 'Producto Gamer';
  const plataformaMostrar = item.plataforma || item.categoria || 'GamerZone';
  const descripcionMostrar = item.descripcion || "Disfruta de este increíble juego en tu consola favorita. Compra 100% segura con la garantía oficial de GamerZone.";

  return (
    <PlantillaPrincipal>
      <div style={{ padding: '30px 20px 60px 20px', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Botón Volver con los colores oficiales de GamerZone */}
          {volverAProductos && (
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <Boton 
                type="button" 
                onClick={volverAProductos}
                style={{ 
                  cursor: 'pointer', 
                  backgroundColor: '#0070f3', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 112, 243, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                ← Volver al catálogo
              </Boton>
            </div>
          )}

          {/* Tarjeta de Detalle del Producto */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
            padding: '35px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '35px',
            alignItems: 'start'
          }}>
            
            {/* Imagen del juego con su ruta original */}
            <div style={{ 
              backgroundColor: '#f1f5f9', 
              padding: '20px', 
              borderRadius: '12px', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '280px'
            }}>
              <img 
                src={item.imagen} 
                alt={tituloMostrar} 
                style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </div>

            {/* Información y Trama del Juego */}
            <div style={{ textAlign: 'left' }}>
              <span style={{ 
                display: 'inline-block',
                backgroundColor: '#e0f2fe', 
                color: '#0284c7', 
                padding: '4px 12px', 
                borderRadius: '12px', 
                fontSize: '0.8rem', 
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px'
              }}>
                {plataformaMostrar}
              </span>

              <h1 style={{ color: '#0f172a', fontSize: '1.8rem', margin: '0 0 10px 0', fontWeight: '800', lineHeight: '1.2' }}>
                {tituloMostrar}
              </h1>

              <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981', margin: '0 0 18px 0' }}>
                {formatPrecio(item.precio)}
              </p>

              {/* Descripción real del juego */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Sobre este juego
                </h4>
                <p style={{ color: '#334155', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                  {descripcionMostrar}
                </p>
              </div>

              {/* Selector de cantidad y Agregar al carrito */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <div>
                  <label htmlFor="cantidad" style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
                    Cantidad
                  </label>
                  <Input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    min="1"
                    max="10"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    style={{ 
                      width: '70px', 
                      backgroundColor: '#ffffff', 
                      color: '#0f172a', 
                      border: '1.5px solid #cbd5e1', 
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '1rem',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Boton 
                    onClick={handleAgregar} 
                    className="btn-primary"
                    style={{ 
                      width: '100%',
                      backgroundColor: '#0070f3', 
                      color: '#ffffff', 
                      padding: '12px 24px', 
                      fontSize: '1rem', 
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 112, 243, 0.25)'
                    }}
                  >
                    Agregar al Carrito 🛒
                  </Boton>
                </div>
              </div>

            </div>

          </div>
        </div>

        {modalData && (
          <ModalNotificacion
            titulo={modalData.titulo}
            mensaje={modalData.mensaje}
            alCerrar={() => setModalData(null)}
          />
        )}
      </div>
    </PlantillaPrincipal>
  );
};

export default DetalleProducto;