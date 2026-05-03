const asesoresDB = {
    "340": [
        { n: "FERNANDEZ DUARTE CLAUDIA", t: "477" },
        { n: "CHAVEZ MALDONADO HUMBERTINA", t: "477" },
        { n: "GRANA LUNA BRENDA LIZBETH", t: "477" },
        { n: "GUICOL BARRENO JOSE LUIS ELIAS", t: "477" },
        { n: "DELGADO PEREZ YOLANDA LETICIA", t: "477" },
        { n: "CASTILLO SAAVEDRA JOSE DE JESUS", t: "477" }
    ],
    "342": [
        { n: "BARRON MENDOZA SONIA JAZMIN", t: "477" },
        { n: "AGUIRRE PEREZ SALVADOR", t: "477" },
        { n: "RUIZ CAMARILLO WENDY GERALDINE", t: "477" },
        { n: "PALMA PALOMINO ARACELI", t: "477" },
        { n: "GUERRA GRANADOS OSCAR DAVID", t: "477" },
        { n: "FUENTES NUÑEZ BERENICE", t: "477" },
        { n: "RAMIREZ HERNANDEZ LEONARDO", t: "477" }
    ],
    "889": [ // Cambiado de 882 a 889
        { n: "LUNA ALVARADO MAURICIO", t: "477 " },
        { n: "SANCHEZ MORELES ABELINA", t: "477" },
        { n: "RIOS SANDOVAL MAGNOLIA", t: "477" },
        { n: "ACOSTA MOLINA ELENA MARIA GUADALUPE", t: "477" },
        { n: "HERNANDEZ ALVARADO ANGELICA MARIA", t: "477" },
        { n: "MURILLO JARAMILLO ANA BERTHA", t: "477" },
        { n: "FLORES OCHOA AYME", t: "477" },
        { n: "GALLAGA MAGDALENO ADELA", t: "477" },
        { n: "MONTAÑO DELGADO CARLOS JAIME", t: "477" },
        { n: "MIRANDA DE LA PARRA CLAUDIA", t: "477" }
    ],
    "703": [
        { n: "GONZALEZ ESCOTO ANTONIO", t: "477" },
        { n: "BENITEZ HERNANDEZ JESUS ROGELIO", t: "477" },
        { n: "PEREZ SILVA LAURA", t: "477" },
        { n: "URRUTIA MATA MARGARITO SEBASTIAN", t: "477" },
        { n: "PATLAN ALVARADO SERGIO ALEJANDRO", t: "477" },
        { n: "HERNANDEZ QUINTERO RICARDO", t: "477" },
        { n: "CHACON URIBE GILBERTO", t: "477" },
        { n: "MENDOZA RODRIGUEZ BELEM GUADALUPE", t: "477" },
        { n: "SANDOVAL GUTIERREZ NATALI ELIZABETH", t: "477" },
        { n: "MEDINA CRUZ LUIS RAMON", t: "477" },
        { n: "TREJO ABARCA NURIA FABIOLA", t: "477" }
    ]
};

function actualizarAsesores() {
    const g = document.getElementById('gerencia').value;
    const a = document.getElementById('asesor');
    a.innerHTML = '<option value="">Seleccione...</option>';
    document.getElementById('telefono').value = '';
    
    if (asesoresDB[g]) {
        asesoresDB[g].forEach(p => {
            let opt = document.createElement('option');
            opt.value = p.n; 
            opt.textContent = p.n; 
            opt.dataset.tel = p.t;
            a.appendChild(opt);
        });
    }
}

function actualizarTelefono() {
    const a = document.getElementById('asesor');
    const sel = a.options[a.selectedIndex];
    document.getElementById('telefono').value = sel ? sel.dataset.tel || '' : '';
}

function fmt(n) { 
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n); 
}

function generarCotizacion() {
    const tp = document.getElementById('tipo-pago').value;
    const mp = parseFloat(document.getElementById('metodo-pago').value);
    const esInmediato = document.getElementById('toggle-inmediato').checked;
    
    const lista = document.getElementById('lista-items');
    const totales = document.getElementById('totales-tabla');
    lista.innerHTML = '';
    let sumaFinal = 0;

    const selServ = document.getElementById('servicio');
    const selProp = document.getElementById('propiedad');
    const cantServicios = parseInt(document.getElementById('cantidad-servicios').value) || 0;
    
    let valServicio = 0;
    let valPropiedad = 0;

    if (esInmediato) {
        valServicio = parseFloat(selServ.options[selServ.selectedIndex].dataset.precioInm) || 0;
        valPropiedad = parseFloat(selProp.options[selProp.selectedIndex].dataset.precioInm) || 0;
    } else {
        valServicio = parseFloat(selServ.value) || 0;
        valPropiedad = parseFloat(selProp.value) || 0;
    }

    let dPromoServicio = 0;
    let dPromoPropiedad = 0;
    let dMP = 0;

    if (esInmediato) {
        dPromoServicio = 0;
        dPromoPropiedad = 0;
        dMP = 0;
    } else {
        dMP = (tp === 'enganche') ? 15 : mp;

        if (tp === 'contado') {
            dPromoServicio = 20;
            dPromoPropiedad = 20;
        } else {
            if (cantServicios > 0 && valServicio > 0 && valPropiedad > 0) {
                dPromoServicio = 15;
                dPromoPropiedad = 15;
            } else if (cantServicios > 0 && valServicio > 0) {
                dPromoServicio = cantServicios === 1 ? 5 : (cantServicios === 2 ? 10 : 15);
            } else if (valPropiedad > 0) {
                dPromoPropiedad = 0; 
            }
        }
    }

    // --- RENDERIZAR SERVICIO ---
    if (cantServicios > 0 && valServicio > 0) {
        const nom = selServ.options[selServ.selectedIndex].dataset.nombre;
        const clv = selServ.options[selServ.selectedIndex].dataset.clave;
        
        const subtotalS = valServicio * cantServicios;
        const pPromo = subtotalS * (1 - (dPromoServicio / 100));
        const finalS = pPromo * (1 - (dMP / 100));
        
        sumaFinal += finalS;

        lista.innerHTML += `
            <tr>
                <td>Servicio: ${nom} (x${cantServicios})</td>
                <td>${clv}</td>
                <td class="text-right">${fmt(subtotalS)}</td>
                <td class="text-right">-${dPromoServicio}%</td>
                <td class="text-right">${fmt(pPromo)}</td>
                <td class="text-right">-${dMP}%</td>
                <td class="text-right"><strong>${fmt(finalS)}</strong></td>
            </tr>`;
    }

    // --- RENDERIZAR PROPIEDAD ---
    if (valPropiedad > 0) {
        const nom = selProp.options[selProp.selectedIndex].dataset.nombre;
        const clv = selProp.options[selProp.selectedIndex].dataset.clave;
        
        const pPromo = valPropiedad * (1 - (dPromoPropiedad / 100));
        const finalP = pPromo * (1 - (dMP / 100));
        
        sumaFinal += finalP;

        lista.innerHTML += `
            <tr>
                <td>Propiedad: ${nom}</td>
                <td>${clv}</td>
                <td class="text-right">${fmt(valPropiedad)}</td>
                <td class="text-right">-${dPromoPropiedad}%</td>
                <td class="text-right">${fmt(pPromo)}</td>
                <td class="text-right">-${dMP}%</td>
                <td class="text-right"><strong>${fmt(finalP)}</strong></td>
            </tr>`;
    }

    // --- RENDERIZAR TOTALES ---
    let htmlTotales = `<tr><td colspan="6" align="right">SUBTOTAL:</td><td class="text-right">${fmt(sumaFinal)}</td></tr>`;
    htmlTotales += `<tr class="total-highlight"><td colspan="6" align="right">TOTAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(sumaFinal)}</td></tr>`;
    
    // Enganche referencial
    if (tp === 'enganche' && !esInmediato) {
        htmlTotales += `<tr style="color:#c0392b; font-weight:bold;"><td colspan="6" align="right">Monto Sugerido de Enganche (15%):</td><td class="text-right">${fmt(sumaFinal * 0.15)}</td></tr>`;
    }

    // NUEVO: Mensualidad dividida en 36 meses (Si no es de contado y la suma final es mayor a 0)
    if (tp !== 'contado' && sumaFinal > 0) {
        let mensualidad = sumaFinal / 36;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="6" align="right">Inversión a 36 Mensualidades:</td><td class="text-right">${fmt(mensualidad)}</td></tr>`;
    }

    totales.innerHTML = htmlTotales;
    
    // --- LLENAR DATOS DEL RECIBO ---
    const tituloCot = document.getElementById('titulo-cotizacion');
    const lblTipoPrecio = document.getElementById('lbl-tipo-precio');
    
    if (esInmediato) {
        tituloCot.innerText = "COTIZACIÓN - USO INMEDIATO";
        lblTipoPrecio.innerText = "(Inmediato)";
    } else {
        tituloCot.innerText = "COTIZACIÓN - PREVISIÓN";
        lblTipoPrecio.innerText = "(Previsión)";
    }

    const selGerencia = document.getElementById('gerencia');
    document.getElementById('res-cliente').innerText = document.getElementById('nombre-cliente').value || "No especificado";
    document.getElementById('res-gerencia').innerText = selGerencia.options[selGerencia.selectedIndex]?.text || "";
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    
    const fecha = new Date();
    document.getElementById('fecha-label').innerText = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

    document.getElementById('resultado-cotizacion').style.display = 'block';
    
    // Auto-scroll al recibo
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// LÓGICA DEL MODAL PARA AMPLIAR IMÁGENES
function abrirModal(src) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgAmpliacion");
    modal.style.display = "block";
    modalImg.src = src;
}

function cerrarModal() {
    document.getElementById("imgModal").style.display = "none";
}

// Cerrar si se hace clic fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById("imgModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Funciones de descarga
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    html2canvas(document.getElementById('pdf-capture'), { scale: 2 }).then(canvas => {
        const img = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Cotizacion_Gayosso.pdf');
    });
}

function descargarImagen() {
    html2canvas(document.getElementById('pdf-capture'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Cotizacion_Gayosso.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
    });
}