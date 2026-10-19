import React from 'react';

// Aquí está la "base de datos" con tus 15 juegos
const productosData = [
  {
    id: 1,
    titulo: 'The Legend of Zelda: Tears of the Kingdom',
    plataforma: 'Nintendo Switch',
    precio: '$54.990',
    imagen: '/img/The Legend of ZeldaTears of the Kingdom.avif'
  },
  {
    id: 2,
    titulo: 'God of War Ragnarök',
    plataforma: 'PlayStation 5',
    precio: '$49.990',
    imagen: '/img/God of War Ragnarök.webp'
  },
  {
    id: 3,
    titulo: 'Halo Infinite',
    plataforma: 'Xbox Series X',
    precio: '$39.990',
    imagen: '/img/Halo Infinite1.webp'
  },
  {
    id: 4,
    titulo: 'Elden Ring',
    plataforma: 'PC / Steam',
    precio: '$44.990',
    imagen: '/img/Elden Ring.webp'
  },
  {
    id: 5,
    titulo: '2K27',
    plataforma: 'PC / Xbox Series X',
    precio: '$29.990',
    imagen: '/img/2k27.jpg'
  },
  {
    id: 6,
    titulo: 'Borderlands 3',
    plataforma: 'PC / PS5 / Xbox',
    precio: '$25.990',
    imagen: '/img/Borderland3.jpg'
  },
  {
    id: 7,
    titulo: 'Cyberpunk 2077',
    plataforma: 'PC / PS5 / Xbox Series X',
    precio: '$19.990',
    imagen: '/img/Cyberpunk_2077.webp'
  },
  {
    id: 8,
    titulo: 'Dragon Ball FighterZ',
    plataforma: 'PC / PS4 / Xbox One',
    precio: '$15.990',
    imagen: '/img/DBFz.avif'
  },
  {
    id: 9,
    titulo: 'Forza Horizon',
    plataforma: 'Xbox / PC',
    precio: '$34.990',
    imagen: '/img/fh6.avif'
  },
  {
    id: 10,
    titulo: 'Half-Life 3',
    plataforma: 'PC',
    precio: '$59.990',
    imagen: '/img/half-life-3-pc.jpg'
  },
  {
    id: 11,
    titulo: 'Project Zomboid',
    plataforma: 'PC / Steam',
    precio: '$14.990',
    imagen: '/img/projectZomboid.jpg'
  },
  {
    id: 12,
    titulo: 'A Plague Tale: Requiem',
    plataforma: 'PS5 / Xbox Series X / PC',
    precio: '$39.990',
    imagen: '/img/reRequiem.avif'
  },
  {
    id: 13,
    titulo: 'Hollow Knight: Silksong',
    plataforma: 'Nintendo Switch / PC / Xbox',
    precio: '$24.990',
    imagen: '/img/Silksong.avif'
  },
  {
    id: 14,
    titulo: 'Tekken 7',
    plataforma: 'PS4 / Xbox One / PC',
    precio: '$19.990',
    imagen: '/img/tekken7.avif'
  },
  {
    id: 15,
    titulo: 'The Binding of Isaac: Repentance',
    plataforma: 'PC / Switch / PS5',
    precio: '$29.990',
    imagen: '/img/theBindingOfIsaacRepentance.jpg' 
  }
];

// (TODA TU LISTA DE productosData SE QUEDA IGUAL ARRIBA DE ESTO)

// (MANTÉN TU LISTA DE productosData QUE YA TIENES ARRIBA DEL ARCHIVO)

// (MANTÉN TU LISTA DE 15 JUEGOS productosData ARRIBA IGUAL)

const Productos = ({ agregarAlCarrito, limite, verCatalogoCompleto }) => {
  // Si le pasamos un límite (ej. 5), corta la lista. Si no, muestra los 15.
  const juegosAMostrar = limite ? productosData.slice(0, limite) : productosData;

  return (
    <section className="productos-destacados" id="productos-destacados">
      <div className="container">
        <h3 className="titulo-seccion">
          {limite ? 'Juegos Destacados' : 'Catálogo Completo de Juegos'}
        </h3>
        
        <div className="grid-productos" id="contenedor-productos">
          {juegosAMostrar.map((producto) => (
            <div className="card-producto" key={producto.id}>
              <img src={producto.imagen} alt={producto.titulo} />
              <h4>{producto.titulo}</h4>
              <span className="badge">{producto.plataforma}</span>
              <p className="precio">{producto.precio}</p>
              <button className="btn-agregar" onClick={() => agregarAlCarrito(producto)}>
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>

        {/* Si estamos en el Home (modo límite), mostramos el botón para ver todo */}
        {limite && verCatalogoCompleto && (
          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <button className="btn-primary" onClick={verCatalogoCompleto}>
              Ver catálogo completo ({productosData.length} juegos) →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Productos;