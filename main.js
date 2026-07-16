// =====================
// CONTADOR
// =====================
const fechaObjetivo = new Date("August 8, 2026 20:30:00").getTime();

const actualizarContador = () => {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horas;
  document.getElementById("minutos").innerText = minutos;
  document.getElementById("segundos").innerText = segundos;
};

setInterval(actualizarContador, 1000);
actualizarContador();


// =====================
// CARRUSEL (MULTIPLE)
// =====================
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.slide');
  const next = carousel.querySelector('.next');
  const prev = carousel.querySelector('.prev');

  let index = 0;

  function actualizar() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    actualizar();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    actualizar();
  });
});


// =====================
// COPIAR ALIAS
// =====================
function copiarAlias() {
  const alias = "sofi.ferrer.xv";

  navigator.clipboard.writeText(alias).then(() => {
    const mensaje = document.getElementById("mensaje-copiado");
    mensaje.innerText = "Alias copiado ✔";

    setTimeout(() => {
      mensaje.innerText = "";
    }, 2000);
  });
}


// =====================
// GOOGLE SHEETS + WHATSAPP
// =====================

const URL_GOOGLE_SHEETS =
  "https://script.google.com/macros/s/AKfycbyfQ5WxRw2681K1cvsIe7wdR5tbNnOKtBuezvLzQT9uWWF6GLfwd6lnReAkUmyBlyQwpQ/exec";

let enviandoConfirmacion = false;

async function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const personas = document.getElementById("personas").value.trim();
  const alimentacion = document.getElementById("alimentacion").value.trim();
  const cancion = document.getElementById("cancion").value.trim();

  const asistencia = document.querySelector(
    'input[name="asistencia"]:checked'
  );

  if (!nombre || !apellido || !asistencia) {
    alert("Completá los datos obligatorios");
    return;
  }

  const mensaje = `Hola! Confirmación de asistencia:

Nombre: ${nombre} ${apellido}
Asistencia: ${asistencia.value}
Personas: ${personas || "No especificado"}
Alimentación: ${alimentacion || "Ninguno"}
Canción: ${cancion || "No indicó"}`;

  const numero = "5493489548466";

  const urlWhatsApp =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  const datos = new URLSearchParams();

  datos.append("nombre", nombre);
  datos.append("apellido", apellido);
  datos.append("asistencia", asistencia.value);
  datos.append("personas", personas || "No especificado");
  datos.append("alimentacion", alimentacion || "Ninguno");
  datos.append("cancion", cancion || "No indicó");

  try {
    await fetch(URL_GOOGLE_SHEETS, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: datos.toString()
    });

    window.open(urlWhatsApp, "_blank");

  } catch (error) {
    console.error(error);

    alert("No se pudo guardar la confirmación");
  }
}


// =====================
// WELCOME + MÚSICA
// =====================
const btnIngresar = document.getElementById("btnIngresar");
const welcome = document.getElementById("welcome");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

btnIngresar.addEventListener("click", () => {
  // sacar pantalla de bienvenida
  welcome.classList.add("salir");

  setTimeout(() => {
    welcome.style.display = "none";
  }, 800);

  // mostrar botón música
  btnMusica.classList.add("activo");
  btnMusica.innerText = "❚❚";

  // reproducir música
  audio.volume = 0.5; // volumen inicial
audio.play().then(() => {
  console.log("audio ok");
}).catch(err => {
  console.log("error audio:", err);
});
});

btnMusica.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnMusica.innerText = "❚❚";
  } else {
    audio.pause();
    btnMusica.innerText = "▶";
  }
});