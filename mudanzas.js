// Condicional: mostrar campo de ayudantes si el usuario lo necesita
const soloTransporte = document.getElementById("solo_transporte");
const grupoAyudantes = document.getElementById("grupo-ayudantes");
const inputAyudantes = document.getElementById("input-ayudantes");

if (soloTransporte) {
  soloTransporte.addEventListener("change", function () {
    if (this.value === "no") {
      grupoAyudantes.classList.remove("d-none");
      inputAyudantes.required = true;
    } else {
      grupoAyudantes.classList.add("d-none");
      inputAyudantes.required = false;
      inputAyudantes.value = "";
    }
  });
}

// Condicional: mostrar paradas adicionales si hay más viajes
const masViajesRadios = document.querySelectorAll('input[name="mas_viajes"]');
const paradasAdicionalesContainer = document.getElementById("paradas-adicionales");
const btnAgregarParada = document.getElementById("btn-agregar-parada");

masViajesRadios.forEach(radio => {
  radio.addEventListener("change", function () {
    if (this.value === "si") {
      paradasAdicionalesContainer.classList.remove("d-none");
      btnAgregarParada.style.display = "block";
    } else {
      paradasAdicionalesContainer.classList.add("d-none");
      btnAgregarParada.style.display = "none";
      paradasAdicionalesContainer.innerHTML = '<div class="col-12"><h6 class="fw-bold text-success">Paradas adicionales</h6></div>';
      contadorParadas = 0;
    }
  });
});

// Agregar paradas dinámicas
let contadorParadas = 0;
function agregarParada() {
  contadorParadas++;
  const contenedor = document.getElementById("paradas-adicionales");
  
  const div = document.createElement("div");
  div.classList.add("row", "g-3", "p-3", "border", "rounded", "bg-light", "mt-3");
  div.id = `parada-${contadorParadas}`;

  div.innerHTML = `
    <div class="col-12">
      <h6 class="fw-bold">Parada #${contadorParadas}</h6>
    </div>
    
    <div class="col-md-6">
      <label class="form-label fw-bold">Barrio</label>
      <input type="text" class="form-control" name="parada_${contadorParadas}_barrio" placeholder="Barrio">
    </div>

    <div class="col-md-6">
      <label class="form-label fw-bold">Dirección</label>
      <input type="text" class="form-control" name="parada_${contadorParadas}_direccion" placeholder="Dirección" required>
    </div>

    <div class="col-md-3">
      <label class="form-label fw-bold">Piso</label>
      <input type="number" class="form-control" name="parada_${contadorParadas}_piso" min="0" max="50">
    </div>

    <div class="col-md-9">
      <label class="form-label fw-bold">Tipo de vivienda</label>
      <select class="form-select" name="parada_${contadorParadas}_tipo">
        <option selected>Casa</option>
        <option>Apartamento</option>
        <option>Unidad residencial</option>
        <option>Oficina</option>
      </select>
    </div>

    <div class="col-12">
      <button type="button" class="btn btn-sm btn-danger" onclick="eliminarParada(${contadorParadas})">
        × Eliminar parada
      </button>
    </div>
  `;

  contenedor.appendChild(div);
}

function eliminarParada(numero) {
  const parada = document.getElementById(`parada-${numero}`);
  if (parada) {
    parada.remove();
  }
}

// Inicializar carrusel con wrap y atajos de teclado para mejor UX
document.addEventListener('DOMContentLoaded', function() {
  const carouselEl = document.getElementById('galeriaNosotros');
  if (carouselEl && typeof bootstrap !== 'undefined') {
    // Inicializa el componente de Bootstrap con wrap = true
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      keyboard: false,
      pause: 'hover'
    });

    // Soporte de teclado (flechas) para moverse entre slides
    document.addEventListener('keydown', function(e) {
      if (!document.querySelector('.carousel-item.active')) return;
      const activeCarousel = document.querySelector('.carousel-item.active').closest('#galeriaNosotros');
      if (!activeCarousel) return;

      if (e.key === 'ArrowLeft') {
        const prevBtn = carouselEl.querySelector('.carousel-control-prev');
        if (prevBtn) prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        const nextBtn = carouselEl.querySelector('.carousel-control-next');
        if (nextBtn) nextBtn.click();
      }
    });
  }
});

// Agregar campos "otros" dinámicos
let contadorOtros = 0;
function agregarOtro() {
  contadorOtros++;
  const contenedor = document.getElementById("otros-container");
  if (!contenedor) return;

  const div = document.createElement("div");
  div.classList.add("col-md-6");

  div.innerHTML = `
    <input 
      type="text" 
      class="form-control" 
      name="otro_${contadorOtros}" 
      placeholder="Otro objeto (ej: Bicicleta, Piano, Caja fuerte)">
  `;

  contenedor.appendChild(div);
}



document.getElementById("formulario_cotiza").addEventListener("submit", function(e) {
  e.preventDefault();

  const f = e.target;

  // VALIDACIONES
  // Validar nombre
  if (!f.nombre.value || f.nombre.value.trim().length < 3) {
    alert("⚠️ El nombre debe tener al menos 3 caracteres");
    return;
  }
  if (f.nombre.value.length > 50) {
    alert("⚠️ El nombre no puede exceder 50 caracteres");
    return;
  }
  if (!/^[a-záéíóúñ\s]+$/i.test(f.nombre.value)) {
    alert("⚠️ El nombre solo puede contener letras y espacios");
    return;
  }

  // Validar teléfono
  const telefonoLimpio = f.celular1.value.replace(/\D/g, '');
  if (telefonoLimpio.length < 7 || telefonoLimpio.length > 15) {
    alert("⚠️ El teléfono debe tener entre 7 y 15 dígitos");
    return;
  }

  // Validar correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(f.correo.value)) {
    alert("⚠️ Por favor ingresa un correo válido");
    return;
  }

  // Validar barrios y direcciones (máximo 100 caracteres)
  if (f.barrio_origen.value.length > 100 || f.barrio_destino.value.length > 100 || f.direccion.value.length > 100) {
    alert("⚠️ Los barrios y direcciones no pueden exceder 100 caracteres");
    return;
  }

  // Validar pisos (máximo 100)
  if ((f.piso_actual.value && f.piso_actual.value > 100) || (f.piso_destino.value && f.piso_destino.value > 100)) {
    alert("⚠️ El número de piso no puede ser mayor a 100");
    return;
  }

  // Validar ayudantes (máximo 20)
  if (f.ayudantes.value > 20) {
    alert("⚠️ No puedes solicitar más de 20 ayudantes");
    return;
  }

  // Validar que no haya cantidades absurdas en objetos (máximo 999 por artículo)
  const objetosLista = [
    "cama_doble","cama_sencilla","colchon","closet",
    "sofa","centro_tv","televisores",
    "nevera","lavadora","estufa","microondas",
    "comedor","escritorios","cajas","chuspas"
  ];

  for (let objeto of objetosLista) {
    if (f[objeto] && f[objeto].value > 999) {
      alert(`⚠️ No puedes ingresar más de 999 unidades de ${objeto.replace(/_/g, " ")}`);
      return;
    }
  }

  let mensaje = `🚚 *COTIZACIÓN DE MUDANZA* 🚚\n\n`;

  // DATOS PERSONALES
  mensaje += `👤 *Nombre:* ${f.nombre.value}\n`;
  mensaje += `📱 *Celular:* ${f.celular1.value}\n`;
  if (f.celular2.value) mensaje += `📞 *Celular 2:* ${f.celular2.value}\n`;
  mensaje += `📧 *Correo:* ${f.correo.value}\n\n`;

  // UBICACIÓN PRINCIPAL
  mensaje += `📍 *PARADA PRINCIPAL*\n`;
  mensaje += `🏠 *Barrio Origen:* ${f.barrio_origen.value}\n`;
  mensaje += `📍 *Barrio Destino:* ${f.barrio_destino.value}\n`;
  mensaje += `🏢 *Dirección:* ${f.direccion.value}\n`;
  mensaje += `🏘 *Tipo vivienda:* ${f.tipo_vivienda.value}\n`;
  mensaje += `⬆ Piso actual: ${f.piso_actual.value || 'N/A'}\n`;
  mensaje += `⬇ Piso destino: ${f.piso_destino.value || 'N/A'}\n\n`;

  // PARADAS ADICIONALES
  if (f.mas_viajes.value === "si") {
    mensaje += `📍 *PARADAS ADICIONALES*\n`;
    for (let i = 1; i <= contadorParadas; i++) {
      const barrio = f[`parada_${i}_barrio`];
      const direccion = f[`parada_${i}_direccion`];
      const piso = f[`parada_${i}_piso`];
      const tipo = f[`parada_${i}_tipo`];

      if (direccion && direccion.value.trim() !== "") {
        mensaje += `\n*Parada #${i}:*\n`;
        if (barrio && barrio.value) mensaje += `  Barrio: ${barrio.value}\n`;
        mensaje += `  Dirección: ${direccion.value}\n`;
        if (piso && piso.value) mensaje += `  Piso: ${piso.value}\n`;
        if (tipo && tipo.value) mensaje += `  Tipo: ${tipo.value}\n`;
      }
    }
    mensaje += `\n`;
  }

  // SERVICIO
  mensaje += `🧑‍🔧 *Ayudantes:* ${f.ayudantes.value || 0}\n`;
  mensaje += `🚛 *Solo transporte:* ${f.solo_transporte.value}\n`;
  mensaje += `📅 *Fecha:* ${f.fecha.value}\n`;
  mensaje += `⏰ *Hora:* ${f.hora.value}\n\n`;

  // OBJETOS
  mensaje += `📦 *OBJETOS A TRANSPORTAR:*\n`;

  const objetos = [
    "cama_doble","cama_sencilla","colchon","closet",
    "sofa","centro_tv","televisores",
    "nevera","lavadora","estufa","microondas",
    "comedor","escritorios","cajas","chuspas"
  ];

  objetos.forEach(nombre => {
    if (f[nombre] && f[nombre].value > 0) {
      mensaje += `• ${nombre.replace(/_/g," ")}: ${f[nombre].value}\n`;
    }
  });

  // OTROS DINÁMICOS
  for (let i = 1; i <= contadorOtros; i++) {
    const campo = f[`otro_${i}`];
    if (campo && campo.value.trim() !== "") {
      mensaje += `• Otro: ${campo.value}\n`;
    }
  }

  mensaje += `\n✅ *Enviado desde la web*`;

  const telefono = "573153097632"; // WhatsApp Colombia (+57 código país)

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});