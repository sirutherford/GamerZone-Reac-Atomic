import React, { useState } from 'react';

const labelEstiloGamer = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: '700',
  color: '#cbd5e1',
  marginBottom: '6px',
  textAlign: 'center'
};

const inputEstiloGamer = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #334155',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  outline: 'none'
};

const ModalProducto = ({ esEdicion, formData, setFormData, onSubmit, alCerrar }) => {
  const [modoImagen, setModoImagen] = useState('archivo'); // 'archivo' | 'url'
  const [nombreArchivo, setNombreArchivo] = useState('');

  // Convierte el archivo seleccionado a Base64
  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("La imagen es demasiado pesada. Selecciona un archivo menor a 4MB.");
        return;
      }
      setNombreArchivo(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagen: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // NUEVA FUNCIÓN: Para formatear el precio automáticamente mientras se escribe
  const handlePrecioChange = (e) => {
    // 1. Quitar cualquier cosa que no sea número
    const valorLimpio = e.target.value.replace(/\D/g, '');
    
    // 2. Si queda vacío, actualizamos el estado en blanco
    if (!valorLimpio) {
      setFormData({ ...formData, precio: '' }); 
      return;
    }
    
    // 3. Formateamos y guardamos (ej: 15000 -> "15.000")
    const valorFormateado = Number(valorLimpio).toLocaleString('es-CL');
    setFormData({ ...formData, precio: valorFormateado });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1f293d',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '28px 32px',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        color: '#ffffff'
      }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', textAlign: 'center' }}>
          {esEdicion ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
        </h3>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          
          {/* Código */}
          <div>
            <label style={labelEstiloGamer}>Código</label>
            <input 
              type="text" 
              value={formData.codigo || ''} 
              onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              placeholder="GZ-001"
              style={inputEstiloGamer} 
              required 
            />
          </div>

          {/* Título / Nombre */}
          <div>
            <label style={labelEstiloGamer}>Título / Nombre</label>
            <input 
              type="text" 
              value={formData.titulo || formData.nombre || ''} 
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value, nombre: e.target.value })}
              placeholder="Ej: God of War Ragnarök"
              style={inputEstiloGamer} 
              required 
            />
          </div>

          {/* Descripción del Producto */}
          <div>
            <label style={labelEstiloGamer}>Descripción del Producto</label>
            <textarea 
              rows="3"
              value={formData.descripcion || ''} 
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Detalles, sinopsis o características principales..."
              style={{
                ...inputEstiloGamer,
                resize: 'vertical',
                minHeight: '75px',
                fontFamily: 'inherit'
              }} 
            />
          </div>

          {/* Precio y Stock */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelEstiloGamer}>Precio ($ CLP)</label>
              <input 
                type="text" 
                value={formData.precio ? Number(String(formData.precio).replace(/\D/g, '')).toLocaleString('es-CL') : ''} 
                onChange={handlePrecioChange}
                placeholder="49.990"
                style={inputEstiloGamer} 
                required 
              />
            </div>

            <div>
              <label style={labelEstiloGamer}>Stock</label>
              <input 
                type="number" 
                value={formData.stock !== undefined ? formData.stock : ''} 
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="10"
                style={inputEstiloGamer} 
                required 
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label style={labelEstiloGamer}>Categoría</label>
            <select 
              value={formData.categoria || 'Todas las plataformas'} 
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              style={inputEstiloGamer}
            >
              <option value="Todas las plataformas">Todas las plataformas</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Xbox Series X">Xbox Series X</option>
              <option value="PC / Steam">PC / Steam</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          {/* Carga de Imagen GamerZone */}
          <div>
            <label style={labelEstiloGamer}>Imagen del Producto</label>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setModoImagen('archivo')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  backgroundColor: modoImagen === 'archivo' ? '#0070f3' : '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: modoImagen === 'archivo' ? '0 0 10px rgba(0, 112, 243, 0.4)' : 'none'
                }}
              >
                💻 Subir desde PC
              </button>
              
              <button
                type="button"
                onClick={() => setModoImagen('url')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  backgroundColor: modoImagen === 'url' ? '#0070f3' : '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: modoImagen === 'url' ? '0 0 10px rgba(0, 112, 243, 0.4)' : 'none'
                }}
              >
                🔗 Enlace URL
              </button>
            </div>

            {modoImagen === 'archivo' ? (
              <div>
                <input 
                  id="file-input-gamerzone"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageFileChange}
                  style={{ display: 'none' }} 
                />

                <label
                  htmlFor="file-input-gamerzone"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '2px dashed #0070f3',
                    backgroundColor: '#0f172a',
                    color: '#38bdf8',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}></span>
                  <span>
                    {nombreArchivo ? `Seleccionado: ${nombreArchivo}` : 'Elegir archivo de imagen desde tu PC...'}
                  </span>
                </label>
              </div>
            ) : (
              <div>
                <input 
                  type="url" 
                  value={formData.imagen || ''} 
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                  placeholder="https://..."
                  style={inputEstiloGamer} 
                />
              </div>
            )}

            {/* Vista Previa */}
            {formData.imagen && (
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>Vista previa de la portada:</div>
                <img 
                  src={formData.imagen} 
                  alt="Vista previa" 
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: '2px solid #0070f3',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
                  }} 
                />
              </div>
            )}
          </div>

          {/* Botones Accionables */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={alCerrar}
              style={{
                padding: '10px 22px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#3b475d',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.88rem'
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={{
                padding: '10px 26px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#0070f3',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '800',
                fontSize: '0.88rem',
                boxShadow: '0 0 12px rgba(0, 112, 243, 0.4)'
              }}
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalProducto;