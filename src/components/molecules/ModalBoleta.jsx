import React from 'react';

const ModalBoleta = ({ orden, alFinalizar }) => {
  if (!orden) return null;

  // Extracción exhaustiva del R.U.T. para asegurar que lo encuentre
  const rutCliente = orden.rut || orden.rutCliente || orden.clienteRut || orden.datosEntrega?.rut || orden.usuarioRut || '11111111-8';
  const emailCliente = orden.email || orden.datosEntrega?.email || 'N/A';
  
  const direccionCliente = (orden.datosEntrega && typeof orden.datosEntrega === 'object') 
    ? `${orden.datosEntrega.direccion || ''}, ${orden.datosEntrega.comuna || ''}` 
    : 'Retiro en Tienda';

  const totalBruto = typeof orden.total === 'number' 
    ? orden.total 
    : parseInt(String(orden.total || 0).replace(/[^0-9]/g, ''), 10) || 0;

  const montoNeto = Math.round(totalBruto / 1.19);
  const montoIVA = totalBruto - montoNeto;
  const numBoleta = orden.numBoleta || Math.floor(Math.random() * 90000) + 10000;

  // Plantilla oficial del S.I.I.
  const generarPlantillaHTML = () => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Boleta N° ${numBoleta} - GamerZone</title>
      <style>
        @media print {
          @page { margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #fff !important; padding: 20px !important; }
          .boleta-container { border: 2px solid #0070f3 !important; }
        }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background-color: #f0f4f8; padding: 40px; margin: 0; }
        .boleta-container { max-width: 850px; margin: 0 auto; background: #fff; border: 2px solid #0070f3; border-radius: 6px; padding: 30px 40px; box-sizing: border-box; }
        
        .header { display: flex; justify-content: space-between; align-items: flex-start; }
        .empresa-info h1 { color: #0070f3; margin: 0 0 10px 0; font-size: 24px; font-weight: 900; display: flex; align-items: center; gap: 10px; text-transform: uppercase; }
        .empresa-info p { margin: 3px 0; font-size: 13px; color: #444; }
        
        .sii-box { border: 2px solid #dc2626; padding: 15px 30px; text-align: center; border-radius: 4px; min-width: 220px; }
        .sii-box p { margin: 4px 0; font-size: 15px; font-weight: bold; color: #dc2626; }
        
        .divider { border-top: 2px solid #0070f3; margin: 25px 0; }
        
        .cliente-info { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px 20px; display: flex; font-size: 13px; color: #111; gap: 20px; }
        .cliente-col { flex: 1; display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: center; }
        .rut-blue { color: #0070f3; font-weight: normal; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 13px; }
        th { background-color: #0070f3; color: white; text-align: left; padding: 12px 15px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        th.center { text-align: center; }
        th.right { text-align: right; }
        td { padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #000; }
        td.center { text-align: center; }
        td.right { text-align: right; }
        td.bold { font-weight: bold; }
        td.codigo { color: #64748b; }
        
        .totales-container { display: flex; justify-content: flex-end; margin-top: 20px; }
        .totales-box { width: 320px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px 20px; background-color: #f8fafc; }
        .totales-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #555; }
        .totales-total { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 12px; border-top: 2px solid #0070f3; font-weight: 900; font-size: 16px; color: #000; }
        .totales-total .monto-final { color: #10b981; font-size: 20px; }
        
        .footer { text-align: center; margin-top: 50px; font-size: 11px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 20px; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="boleta-container">
        <div class="header">
          <div class="empresa-info">
            <h1>🎮 GAMERZONE CHILE</h1>
            <p>GamerZone SpA</p>
            <p>R.U.T. Empresa: 76.543.210-K</p>
            <p>Giro: Venta de Videojuegos y Equipamiento Gamer</p>
            <p>Av. Providencia 1234, Santiago, Chile</p>
          </div>
          <div class="sii-box">
            <p>R.U.T. 76.543.210-K</p>
            <p>BOLETA ELECTRÓNICA</p>
            <p>N° ${numBoleta}</p>
          </div>
        </div>
        
        <div class="divider"></div>

        <div class="cliente-info">
          <div class="cliente-col">
            <strong>Cliente:</strong> <span>${orden.usuario || orden.cliente || 'Anónimo'}</span>
            <strong>Fecha Emisión:</strong> <span>${orden.fecha || 'N/A'}</span>
            <strong>Dirección de Entrega:</strong> <span>${direccionCliente}</span>
          </div>
          <div class="cliente-col">
            <strong>R.U.T. Cliente:</strong> <span class="rut-blue">${rutCliente}</span>
            <strong>Correo Electrónico:</strong> <span>${emailCliente}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>PRODUCTO</th>
              <th class="center">CANT.</th>
              <th class="right">PRECIO UN.</th>
              <th class="right">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${(orden.productos || []).map((p, i) => {
              const precioNum = typeof p.precio === 'number' ? p.precio : parseInt(String(p.precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
              const cantidad = p.cantidad || 1;
              const codigoProd = p.codigo || `GZ-00${i + 1}`;
              return `
                <tr>
                  <td class="codigo">${codigoProd}</td>
                  <td class="bold">${p.titulo || p.nombre}</td>
                  <td class="center">${cantidad}</td>
                  <td class="right">$${precioNum.toLocaleString('es-CL')}</td> <td class="right bold">$${(precioNum * cantidad).toLocaleString('es-CL')}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="totales-container">
          <div class="totales-box">
            <div class="totales-row"><span>Monto Neto:</span><span>$${montoNeto.toLocaleString('es-CL')}</span></div>
            <div class="totales-row"><span>19% I.V.A.:</span><span>$${montoIVA.toLocaleString('es-CL')}</span></div>
            <div class="totales-total"><span>Total Bruto:</span><span class="monto-final">$${totalBruto.toLocaleString('es-CL')}</span></div>
          </div>
        </div>

        <div class="footer">
          El IVA de esta boleta ha sido retenido y pagado de acuerdo a la normativa legal vigente del S.I.I.<br>
          ¡Gracias por tu compra en GamerZone! www.gamerzone.cl
        </div>
      </div>
    </body>
    </html>
  `;

  const handleDescargarPDF = () => {
    const ventanaNueva = window.open('', '_blank');
    if (ventanaNueva) {
      ventanaNueva.document.write(generarPlantillaHTML());
      ventanaNueva.document.close();
      setTimeout(() => {
        ventanaNueva.print();
      }, 300);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', width: '90%', maxWidth: '600px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', color: '#333'
      }}>
        {/* Encabezado del Modal */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0070f3', paddingBottom: '15px', marginBottom: '20px' }}>
          <h2 style={{ color: '#0070f3', margin: '0 0 5px 0', fontSize: '1.5rem', fontWeight: '900' }}>GAMERZONE</h2>
          <h4 style={{ margin: '0 0 5px 0', color: '#475569' }}>BOLETA ELECTRÓNICA N° {numBoleta}</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Fecha: {orden.fecha || 'N/A'}</p>
        </div>
        
        {/* Datos Cliente en el Modal (Ahora incluye R.U.T.) */}
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><strong>Cliente:</strong> {orden.usuario || orden.cliente || 'Anónimo'}</div>
            <div><strong>R.U.T.:</strong> {rutCliente}</div>
            <div style={{ gridColumn: '1 / -1' }}><strong>Despacho a:</strong> {direccionCliente}</div>
          </div>
        </div>

        {/* Tabla Productos en el Modal */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e293b', color: '#fff' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderRadius: '6px 0 0 6px' }}>Producto</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Cant.</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Unitario</th>
              <th style={{ padding: '10px', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {(orden.productos || []).map((p, i) => {
              const precioNum = typeof p.precio === 'number' ? p.precio : parseInt(String(p.precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
              const subtotal = precioNum * (p.cantidad || 1);
              return (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px' }}>{p.titulo || p.nombre}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{p.cantidad || 1}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>${precioNum.toLocaleString('es-CL')}</td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>${subtotal.toLocaleString('es-CL')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totales en el Modal */}
        <div style={{ textAlign: 'right', marginBottom: '25px', fontSize: '0.9rem', color: '#475569' }}>
          <div style={{ marginBottom: '5px' }}>Monto Neto: ${montoNeto.toLocaleString('es-CL')}</div>
          <div style={{ marginBottom: '15px' }}>IVA (19%): ${montoIVA.toLocaleString('es-CL')}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10b981' }}>Total Pagado: ${totalBruto.toLocaleString('es-CL')}</div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
          <button 
            onClick={handleDescargarPDF} 
            style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#0070f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            Descargar PDF 📄
          </button>
          <button 
            onClick={alFinalizar} 
            style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#0070f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            Aceptar y Cerrar 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBoleta;