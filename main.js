
// =====================
// CONTADOR
// =====================
const fechaObjetivo = new Date("August 8, 2026 20:30:00").getTime();

const actualizarContador = () => {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    document.getElementById("dias").innerText = "00";
    document.getElementById("horas").innerText = "00";
    document.getElementById("minutos").innerText = "00";
    document.getElementById("segundos").innerText = "00";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia / (1000 * 60 * 60)) % 24
  );
  const minutos = Math.floor(
    (diferencia / (1000 * 60)) % 60
  );
  const segundos = Math.floor(
    (diferencia / 1000) % 60
  );

  document.getElementById("dias").innerText =
    String(dias).padStart(2, "0");

  document.getElementById("horas").innerText =
    String(horas).padStart(2, "0");

  document.getElementById("minutos").innerText =
    String(minutos).padStart(2, "0");

  document.getElementById("segundos").innerText =
    String(segundos).padStart(2, "0");
};

setInterval(actualizarContador, 1000);
actualizarContador();


// =====================
// CARRUSEL MÚLTIPLE
// =====================
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".slide");
  const next = carousel.querySelector(".next");
  const prev = carousel.querySelector(".prev");

  let index = 0;

  if (!track || slides.length === 0) {
    return;
  }

  function actualizar() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (next) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      actualizar();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      actualizar();
    });
  }

  if (slides.length === 1) {
    if (next) next.style.display = "none";
    if (prev) prev.style.display = "none";
  }
});


// =====================
// COPIAR ALIAS
// =====================
function copiarAlias() {
  const alias = "sofi.ferrer.xv";
  const mensaje = document.getElementById("mensaje-copiado");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(alias)
      .then(() => {
        mostrarAliasCopiado(mensaje);
      })
      .catch(() => {
        copiarAliasAlternativo(alias, mensaje);
      });
  } else {
    copiarAliasAlternativo(alias, mensaje);
  }
}

function copiarAliasAlternativo(alias, mensaje) {
  const campoTemporal = document.createElement("textarea");

  campoTemporal.value = alias;
  campoTemporal.style.position = "fixed";
  campoTemporal.style.opacity = "0";

  document.body.appendChild(campoTemporal);

  campoTemporal.focus();
  campoTemporal.select();

  try {
    document.execCommand("copy");
    mostrarAliasCopiado(mensaje);
  } catch (error) {
    alert(`El alias es: ${alias}`);
  }

  document.body.removeChild(campoTemporal);
}

function mostrarAliasCopiado(mensaje) {
  if (!mensaje) {
    return;
  }

  mensaje.innerText = "Alias copiado ✔";

  setTimeout(() => {
    mensaje.innerText = "";
  }, 2000);
}


// =====================
// GOOGLE SHEETS + WHATSAPP
// =====================
const URL_GOOGLE_SHEETS =
  "https://script.google.com/macros/s/AKfycbyfQ5WxRw2681K1cvsIe7wdR5tbNnOKtBuezvLzQT9uWWF6GLfwd6lnReAkUmyBlyQwpQ/exec";

const NUMERO_WHATSAPP = "5493489548466";

let enviandoConfirmacion = false;

function enviarWhatsApp() {
  if (enviandoConfirmacion) {
    return;
  }

  const nombre = document
    .getElementById("nombre")
    .value
    .trim();

  const apellido = document
    .getElementById("apellido")
    .value
    .trim();

  const personas = document
    .getElementById("personas")
    .value
    .trim();

  const alimentacion = document
    .getElementById("alimentacion")
    .value
    .trim();

  const cancion = document
    .getElementById("cancion")
    .value
    .trim();

  const asistencia = document.querySelector(
    'input[name="asistencia"]:checked'
  );

  if (!nombre || !apellido || !asistencia) {
    alert("Completá los datos obligatorios");
    return;
  }

  const botonConfirmar = document.querySelector(
    '.form-box button[onclick="enviarWhatsApp()"]'
  );

  enviandoConfirmacion = true;

  if (botonConfirmar) {
    botonConfirmar.disabled = true;
    botonConfirmar.innerText = "⏳ Guardando...";
  }

  const personasFinal =
    personas || "No especificado";

  const alimentacionFinal =
    alimentacion || "Ninguno";

  const cancionFinal =
    cancion || "No indicó";

  const mensaje = `Hola! Confirmación de asistencia:

Nombre: ${nombre} ${apellido}
Asistencia: ${asistencia.value}
Personas: ${personasFinal}
Alimentación: ${alimentacionFinal}
Canción: ${cancionFinal}`;

  const urlWhatsApp =
    `https://wa.me/${NUMERO_WHATSAPP}` +
    `?text=${encodeURIComponent(mensaje)}`;

  const datos = new URLSearchParams();

  datos.append("nombre", nombre);
  datos.append("apellido", apellido);
  datos.append("asistencia", asistencia.value);
  datos.append("personas", personasFinal);
  datos.append("alimentacion", alimentacionFinal);
  datos.append("cancion", cancionFinal);

  /*
    El guardado se inicia, pero no esperamos a que termine.
    De esta manera, WhatsApp se abre dentro del mismo toque
    del usuario y Safari de iPhone no lo bloquea.
  */
  fetch(URL_GOOGLE_SHEETS, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: datos.toString(),
    keepalive: true
  })
    .then(() => {
      console.log("Confirmación enviada a Google Sheets");
    })
    .catch((error) => {
      console.error(
        "No se pudo guardar en Google Sheets:",
        error
      );
    });

  if (botonConfirmar) {
    botonConfirmar.innerText = "✅ Abriendo WhatsApp...";
  }

  /*
    Se abre inmediatamente, antes de cualquier await,
    para mejorar la compatibilidad con iPhone y Safari.
  */
  const ventanaWhatsApp = window.open(
    urlWhatsApp,
    "_blank"
  );

  /*
    Si Safari, Chrome o un navegador integrado bloquea
    la pestaña nueva, WhatsApp se abre en la pestaña actual.
  */
  if (!ventanaWhatsApp) {
    window.location.href = urlWhatsApp;
    return;
  }

  setTimeout(() => {
    enviandoConfirmacion = false;

    if (botonConfirmar) {
      botonConfirmar.disabled = false;
      botonConfirmar.innerText = "Confirmar";
    }
  }, 2000);
}


// =====================
// WELCOME + MÚSICA
// =====================
const btnIngresar = document.getElementById("btnIngresar");
const welcome = document.getElementById("welcome");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

if (btnIngresar && welcome && audio && btnMusica) {
  btnIngresar.addEventListener("click", () => {
    welcome.classList.add("salir");

    setTimeout(() => {
      welcome.style.display = "none";
    }, 800);

    btnMusica.classList.add("activo");
    btnMusica.innerText = "❚❚";

    audio.volume = 0.5;

    audio
      .play()
      .then(() => {
        console.log("Audio iniciado");
      })
      .catch((error) => {
        console.log(
          "El navegador no permitió iniciar el audio:",
          error
        );

        btnMusica.innerText = "▶";
      });
  });

  btnMusica.addEventListener("click", () => {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          btnMusica.innerText = "❚❚";
        })
        .catch((error) => {
          console.log(
            "No se pudo reproducir el audio:",
            error
          );
        });
    } else {
      audio.pause();
      btnMusica.innerText = "▶";
    }
  });
}