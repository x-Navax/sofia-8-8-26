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
// WHATSAPP
// =====================
function enviarWhatsApp() {

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const personas = document.getElementById("personas").value;
  const alimentacion = document.getElementById("alimentacion").value;
  const cancion = document.getElementById("cancion").value;

  const asistencia = document.querySelector('input[name="asistencia"]:checked');

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

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
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