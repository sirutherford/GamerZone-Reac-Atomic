import React, { useState, useEffect } from 'react';
import { productosData } from '../data/productosData';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import Boton from '../components/atoms/Boton';

const Productos = ({ agregarAlCarrito, limite, verCatalogoCompleto, verDetalle }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem('productosGamerZone');
    let listaFinal = [];

    if (guardados) {
      const parseados = JSON.parse(guardados);
      
      // Filtramos los productos nuevos y "parchamos" los nombres de sus propiedades
      const productosNuevos = parseados.filter(
        (p) => !productosData.some((original) => original.id === p.id)
      ).map(p => ({
        ...p,
        // Si el admin guardó el dato como 'categoria', lo pasamos también como 'plataforma'
        // para que tu TarjetaProducto lo pueda leer correctamente.
        plataforma: p.plataforma || p.categoria || 'Multiplataforma'
      }));

      listaFinal = [...productosData, ...productosNuevos];
    } else {
      listaFinal = productosData;
    }

    setProductos(listaFinal);
    localStorage.setItem('productosGamerZone', JSON.stringify(listaFinal));

  }, []);

  const juegosAMostrar = limite ? productos.slice(0, limite) : productos;

  return (
    <section className="productos-destacados" id="productos-destacados">
      <div className="container">
        <h3 className="titulo-seccion">
          {limite ? 'Juegos Destacados' : 'Catálogo Completo de Juegos'}
        </h3>
        
        <div className="grid-productos" id="contenedor-productos">
          {juegosAMostrar.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              producto={producto} 
              agregarAlCarrito={agregarAlCarrito} 
              verDetalle={verDetalle}
            />
          ))}
        </div>

        {limite && verCatalogoCompleto && (
          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <Boton className="btn-primary" onClick={verCatalogoCompleto}>
              Ver catálogo completo ({productos.length} juegos) →
            </Boton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Productos;