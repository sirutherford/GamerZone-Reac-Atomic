import React, { useState, useEffect } from 'react';
import { productosData } from '../data/productosData';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import Boton from '../components/atoms/Boton';

const Productos = ({ 
  productos: productosProp, 
  agregarAlCarrito, 
  limite, 
  verCatalogoCompleto, 
  verDetalle 
}) => {
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    // 1. Si los productos vienen pasados desde App.jsx, usamos esa lista
    if (productosProp && Array.isArray(productosProp) && productosProp.length > 0) {
      const formateados = productosProp.map(p => ({
        ...p,
        plataforma: p.plataforma || p.categoria || 'Multiplataforma'
      }));
      setListaProductos(formateados);
      return;
    }

    // 2. Si no vienen por prop, leemos EXACTAMENTE lo que está en localStorage
    // (Respetando las ediciones, eliminaciones y precios actualizados en el Admin)
    const guardados = localStorage.getItem('productosGamerZone');
    
    if (guardados) {
      try {
        const parseados = JSON.parse(guardados);
        if (Array.isArray(parseados) && parseados.length > 0) {
          const formateados = parseados.map(p => ({
            ...p,
            plataforma: p.plataforma || p.categoria || 'Multiplataforma'
          }));
          setListaProductos(formateados);
          return;
        }
      } catch (e) {
        console.error('Error al cargar productos de localStorage:', e);
      }
    }

    // 3. ÚNICAMENTE si localStorage está vacío, usamos productosData como inicializador
    const baseFormateada = productosData.map(p => ({
      ...p,
      plataforma: p.plataforma || p.categoria || 'Multiplataforma'
    }));
    setListaProductos(baseFormateada);
    localStorage.setItem('productosGamerZone', JSON.stringify(baseFormateada));
  }, [productosProp]);

  const juegosAMostrar = limite ? listaProductos.slice(0, limite) : listaProductos;

  return (
    <section className="productos-destacados" id="productos-destacados">
      <div className="container">
        <h3 className="titulo-seccion">
          {limite ? 'Juegos Destacados' : 'Catálogo Completo de Juegos'}
        </h3>
        
        <div className="grid-productos" id="contenedor-productos">
          {juegosAMostrar.map((producto, idx) => (
            <TarjetaProducto 
              key={producto.id || idx} 
              producto={producto} 
              agregarAlCarrito={agregarAlCarrito} 
              verDetalle={verDetalle}
            />
          ))}
        </div>

        {limite && verCatalogoCompleto && (
          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <Boton className="btn-primary" onClick={verCatalogoCompleto}>
              Ver catálogo completo ({listaProductos.length} juegos) →
            </Boton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Productos;