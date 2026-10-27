import React from 'react';

const REGIONES_CHILE = {
  "Región Metropolitana": {
    "Santiago": ["Providencia", "Las Condes", "Santiago", "Ñuñoa", "Maipú", "La Florida", "Peñalolén", "Vitacura", "Lo Barnechea", "Macul", "San Miguel", "Pudahuel", "Quilicura", "Renca", "Recoleta", "Independencia"],
    "Cordillera": ["Puente Alto", "Pirque", "San José de Maipo"],
    "Chacabuco": ["Colina", "Lampa", "Tiltil"],
    "Maipo": ["San Bernardo", "Buin", "Paine", "Calera de Tango"],
    "Melipilla": ["Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro"],
    "Talagante": ["Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
  },
  "Valparaíso": {
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví"],
    "Marga Marga": ["Quilpué", "Villa Alemana", "Limache", "Olmué"],
    "San Antonio": ["San Antonio", "Algarrobo", "El Quisco", "El Tabo", "Santo Domingo"],
    "San Felipe": ["San Felipe", "Llaillay", "Putaendo", "Santa María"],
    "Los Andes": ["Los Andes", "Calle Larga", "Rinconada", "San Esteban"]
  },
  "Biobío": {
    "Concepción": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Coronel", "Hualpén", "Lota", "Penco", "Tomé"],
    "Biobío": ["Los Ángeles", "Cabrero", "Mulchén", "Nacimiento", "San Rosendo"],
    "Arauco": ["Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu"]
  },
  "Arica y Parinacota": {
    "Arica": ["Arica", "Camarones"],
    "Parinacota": ["Putre", "General Lagos"]
  },
  "Tarapacá": {
    "Iquique": ["Iquique", "Alto Hospicio"],
    "Tamarugal": ["Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
  },
  "Antofagasta": {
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal"],
    "El Loa": ["Calama", "Ollagüe", "San Pedro de Atacama"],
    "Tocopilla": ["Tocopilla", "María Elena"]
  },
  "Atacama": {
    "Copiapó": ["Copiapó", "Caldera", "Tierra Amarilla"],
    "Chañaral": ["Chañaral", "Diego de Almagro"],
    "Huasco": ["Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
  },
  "Coquimbo": {
    "Elqui": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña"],
    "Limarí": ["Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Choapa": ["Illapel", "Canela", "Los Vilos", "Salamanca"]
  },
  "O'Higgins": {
    "Cachapoal": ["Rancagua", "Machalí", "Graneros", "Rengo", "San Vicente", "Doñihue", "Requínoa"],
    "Colchagua": ["San Fernando", "Santa Cruz", "Chimbarongo", "Nancagua"],
    "Cardenal Caro": ["Pichilemu", "La Estrella", "Litueche", "Marchigüe", "Navidad", "Paredones"]
  },
  "Maule": {
    "Talca": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "San Clemente", "San Rafael"],
    "Curicó": ["Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén"],
    "Linares": ["Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Cauquenes": ["Cauquenes", "Chanco", "Pelluhue"]
  },
  "Ñuble": {
    "Diguillín": ["Chillán", "Chillán Viejo", "Bulnes", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay"],
    "Itata": ["Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ranquil", "Treguaco"],
    "Punilla": ["San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"]
  },
  "Araucanía": {
    "Cautín": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica"],
    "Malleco": ["Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
  },
  "Los Ríos": {
    "Valdivia": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli"],
    "Ranco": ["La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
  },
  "Los Lagos": {
    "Llanquihue": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Puerto Varas"],
    "Chiloé": ["Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"],
    "Osorno": ["Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo"],
    "Palena": ["Chaitén", "Futaleufú", "Hualaihué", "Palena"]
  },
  "Aysén": {
    "Coyhaique": ["Coyhaique", "Lago Verde"],
    "Aysén": ["Aysén", "Cisnes", "Guaitecas"],
    "Capitán Prat": ["Cochrane", "O'Higgins", "Tortel"],
    "General Carrera": ["Chile Chico", "Río Ibáñez"]
  },
  "Magallanes": {
    "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio"],
    "Antártica Chilena": ["Cabo de Hornos", "Antártica"],
    "Tierra del Fuego": ["Porvenir", "Primavera", "Timaukel"],
    "Última Esperanza": ["Natales", "Torres del Paine"]
  }
};

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

const ModalUsuario = ({ esEdicion, formData, setFormData, onSubmit, alGuardar, alCerrar }) => {
  const regionSeleccionada = formData.region && REGIONES_CHILE[formData.region] ? formData.region : "Región Metropolitana";
  const provinciasDisponibles = Object.keys(REGIONES_CHILE[regionSeleccionada] || {});

  const provinciaSeleccionada = formData.provincia && REGIONES_CHILE[regionSeleccionada][formData.provincia] 
    ? formData.provincia 
    : (provinciasDisponibles[0] || "");

  const comunasDisponibles = REGIONES_CHILE[regionSeleccionada]?.[provinciaSeleccionada] || [];

  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    const provincias = Object.keys(REGIONES_CHILE[nuevaRegion] || {});
    const primeraProvincia = provincias[0] || '';
    const comunas = REGIONES_CHILE[nuevaRegion]?.[primeraProvincia] || [];
    const primeraComuna = comunas[0] || '';

    setFormData({
      ...formData,
      region: nuevaRegion,
      provincia: primeraProvincia,
      comuna: primeraComuna
    });
  };

  const handleProvinciaChange = (e) => {
    const nuevaProvincia = e.target.value;
    const comunas = REGIONES_CHILE[regionSeleccionada]?.[nuevaProvincia] || [];
    const primeraComuna = comunas[0] || '';

    setFormData({
      ...formData,
      provincia: nuevaProvincia,
      comuna: primeraComuna
    });
  };

  const handleComunaChange = (e) => {
    setFormData({
      ...formData,
      comuna: e.target.value
    });
  };

  const handleSubmitForm = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    const funcionSubmit = onSubmit || alGuardar;
    if (funcionSubmit) {
      funcionSubmit(e);
    }
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
        maxWidth: '540px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        color: '#ffffff'
      }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', textAlign: 'center' }}>
          {esEdicion ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center' }}>
          {esEdicion ? 'Modifica la información personal, estado y datos del usuario.' : 'Crea una nueva cuenta de usuario en la plataforma.'}
        </p>

        <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Nombre Completo */}
          <div>
            <label style={labelEstiloGamer}>Nombre Completo / Usuario</label>
            <input 
              type="text" 
              value={formData.nombre || ''} 
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Gamer Zone"
              style={inputEstiloGamer} 
              required 
            />
          </div>

          {/* R.U.T. */}
          <div>
            <label style={labelEstiloGamer}>R.U.T.</label>
            <input 
              type="text" 
              value={formData.rut || ''} 
              onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
              placeholder="Ej: 12.345.678-K"
              style={inputEstiloGamer} 
              required 
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label style={labelEstiloGamer}>Correo Electrónico</label>
            <input 
              type="email" 
              value={formData.email || ''} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ejemplo@correo.com"
              style={inputEstiloGamer} 
              required 
            />
          </div>

          {/* Estado de Acceso */}
          <div>
            <label style={labelEstiloGamer}>Estado de Acceso a la Cuenta</label>
            <select
              value={formData.bloqueado ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, bloqueado: e.target.value === 'true' })}
              style={{
                ...inputEstiloGamer,
                color: formData.bloqueado ? '#f87171' : '#34d399',
                fontWeight: '800'
              }}
            >
              <option value="false">🟢 Activa (Permite acceso a la tienda)</option>
              <option value="true">🔴 Bloqueada (Deniega acceso al usuario)</option>
            </select>
          </div>

          {/* Rol de la Cuenta */}
          <div>
            <label style={labelEstiloGamer}>Rol de la Cuenta</label>
            <select
              value={formData.rol || 'usuario'}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              style={{
                ...inputEstiloGamer,
                color: formData.rol === 'admin' ? '#38bdf8' : '#ffffff',
                fontWeight: '700'
              }}
            >
              <option value="usuario"> Cliente / Usuario Normal</option>
              <option value="admin"> Administrador (Acceso total al Panel)</option>
            </select>
          </div>

          {/* Dirección */}
          <div>
            <label style={labelEstiloGamer}>Dirección de Calle y Número</label>
            <input 
              type="text" 
              value={formData.direccion || ''} 
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              placeholder="Ej: Av. Providencia 1234, Depto 502"
              style={inputEstiloGamer} 
            />
          </div>

          {/* Región, Provincia y Comuna */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelEstiloGamer}>Región</label>
              <select value={regionSeleccionada} onChange={handleRegionChange} style={inputEstiloGamer}>
                {Object.keys(REGIONES_CHILE).map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelEstiloGamer}>Provincia</label>
              <select value={provinciaSeleccionada} onChange={handleProvinciaChange} style={inputEstiloGamer}>
                {provinciasDisponibles.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelEstiloGamer}>Comuna</label>
              <select value={formData.comuna || (comunasDisponibles[0] || '')} onChange={handleComunaChange} style={inputEstiloGamer}>
                {comunasDisponibles.map((com) => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gestión de Contraseña segura */}
          <div>
            <label style={labelEstiloGamer}>
              {esEdicion ? 'Nueva Contraseña (Opcional)' : 'Contraseña Inicial'}
            </label>
            <input 
              type="password" 
              value={formData.password || ''} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value, clave: e.target.value })}
              placeholder={esEdicion ? "Dejar en blanco para conservar la clave actual" : "••••••••"}
              style={inputEstiloGamer} 
              required={!esEdicion}
            />
          </div>

          {!esEdicion && (
            <div>
              <label style={labelEstiloGamer}>Confirmar Contraseña Inicial</label>
              <input 
                type="password" 
                value={formData.confirmarPassword || ''} 
                onChange={(e) => setFormData({ ...formData, confirmarPassword: e.target.value })}
                placeholder="••••••••"
                style={inputEstiloGamer} 
                required 
              />
            </div>
          )}

          {/* Botones */}
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

export default ModalUsuario;