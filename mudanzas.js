////condicional de ver si necesita ayudantes o no
const soloTransporte = document.getElementById("solo_transporte");
  const grupoAyudantes = document.getElementById("grupo-ayudantes");
  const inputAyudantes = document.getElementById("input-ayudantes");

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

//fin 

// Mejorar el carrusel: inicializar con wrap para que repita y opciones UX
document.addEventListener('DOMContentLoaded', function() {
  const carouselEl = document.getElementById('galeriaNosotros');
  if (carouselEl && typeof bootstrap !== 'undefined') {
    // Inicializa el componente de Bootstrap con wrap = true
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      keyboard: true,
      pause: 'hover'
    });
  }
});

//Boton para agregar otro objeto en la seccion de otros objetos

function agregarOtro() {
  const container = document.getElementById("otros-container");

  const div = document.createElement("div");
  div.className = "col-md-6";

  div.innerHTML = `
    <input type="text" class="form-control" name="otros[]" placeholder="Ej: Bicicleta, Piano, Caja fuerte">
  `;

  container.appendChild(div);
}



//IMPORTANTEEE EL ENVIO A WHATSAPP

//agregar otro
let contadorOtros = 0;

function agregarOtro() {
  contadorOtros++;

  const contenedor = document.getElementById("otros-container");

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

//FIn agregar otro



document.getElementById("formulario_cotiza").addEventListener("submit", function(e) {
  e.preventDefault();

  const f = e.target;

  let mensaje = `🚚 *COTIZACIÓN DE MUDANZA* 🚚\n\n`;

  // DATOS PERSONALES
  mensaje += `👤 *Nombre:* ${f.nombre.value}\n`;
  mensaje += `📱 *Celular:* ${f.celular1.value}\n`;
  if (f.celular2.value) mensaje += `📞 *Celular 2:* ${f.celular2.value}\n`;
  mensaje += `📧 *Correo:* ${f.correo.value}\n\n`;

  // UBICACIÓN
  mensaje += `📍 *Origen:* ${f.barrio_origen.value}\n`;
  mensaje += `📍 *Destino:* ${f.barrio_destino.value}\n`;
  mensaje += `🏠 *Dirección:* ${f.direccion.value}\n`;
  mensaje += `🏢 *Tipo vivienda:* ${f.tipo_vivienda.value}\n`;
  mensaje += `⬆ Piso actual: ${f.piso_actual.value || 'N/A'}\n`;
  mensaje += `⬇ Piso destino: ${f.piso_destino.value || 'N/A'}\n\n`;

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
      mensaje += `• ${nombre.replace("_"," ")}: ${f[nombre].value}\n`;
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


  const telefono = "573235077586"; // WhatsApp Colombia

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});