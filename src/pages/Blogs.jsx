import React from 'react';

const blogsData = [
  {
    id: 1,
    titulo: 'Los lanzamientos más esperados de la temporada',
    fecha: '12 de Octubre',
    resumen: 'Descubre los títulos que cambiarán la industria este año, desde RPGs masivos hasta indies deslumbrantes.',
    imagen: '/img/Cyberpunk_2077.webp',
    autor: 'GamerZone Team'
  },
  {
    id: 2,
    titulo: '¿Por qué Hollow Knight: Silksong causa tanto furor?',
    fecha: '05 de Octubre',
    resumen: 'Analizamos la espera de uno de los juegos independientes más anticipados de los últimos tiempos.',
    imagen: '/img/Silksong.avif',
    autor: 'Admin'
  },
  {
    id: 3,
    titulo: '¿Sabias que este fue el primer logo de GamerZONE? Descubre la historia detrás de nuestra marca',
    fecha: '28 de Septiembre',
    resumen: 'A inicios del 2026, GamerZONE comenzó como un pequeño proyecto de pasión. Hoy, te contamos cómo evolucionó nuestro logotipo y qué representa para nosotros.',
    imagen: '/img/gamer zone1.jpg',
    autor: 'GamerZone Team'
  }
];

const Blogs = () => {
  return (
    <section className="seccion-blogs" id="blogs">
      <div className="container">
        <h2 className="titulo-seccion">Últimas Noticias & Blogs</h2>
        <div className="grid-blogs">
          {blogsData.map((blog) => (
            <article className="card-blog" key={blog.id}>
              <div className="blog-img-container">
                <img src={blog.imagen} alt={blog.titulo} />
              </div>
              <div className="blog-contenido">
                <span className="blog-fecha">{blog.fecha} | Por {blog.autor}</span>
                <h4>{blog.titulo}</h4>
                <p>{blog.resumen}</p>
                <a href="#" className="btn-leer-mas">Leer más</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;