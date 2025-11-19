  // Animación suave al cargar
  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .btn-hero');
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 300);
    });
  });


gsap.registerPlugin(ScrollTrigger);

// === ANIMACIÓN HERO (entrada suave del título y subtítulo) ===
gsap.from(".hero-title", {
  opacity: 0,
  y: 40,
  scale: 0.9,
  duration: 1.5,
  ease: "expo.out",
});

gsap.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 1.2,
  delay: 0.4,
  ease: "power2.out",
});

gsap.from(".btn", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.8,
  ease: "power2.out",
});

// === EFECTO PARALLAX SUAVE EN VIDEO DE FONDO ===
gsap.to(".hero-video", {
  scale: 1.05,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    scrub: true
  }
});

// === SECCIÓN EXPLORA: TARJETAS FLOTANTES ===
gsap.from(".explora-texto", {
  scrollTrigger: {
    trigger: ".explora",
    start: "top 80%"
  },
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: "power3.out"
});

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 60,
    rotationX: 20,
    scale: 0.95,
    duration: 1.3,
    delay: i * 0.15,
    ease: "power3.out"
  });
});

// === EFECTO SUTIL DE FLOTACIÓN CONTINUA ===
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.to(card, {
    y: "+=10",
    duration: 3 + i,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});


// Seleccionamos el formulario y la lista de reseñas
const formReseña = document.getElementById('form-reseña');
const listaReseñas = document.getElementById('lista-reseñas');

// Escuchamos el evento de envío del formulario
formReseña.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita recargar la página

  // Obtenemos los valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const ocupacion = document.getElementById('ocupacion').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Creamos una nueva tarjeta de reseña
  const nuevaReseña = document.createElement('div');
  nuevaReseña.classList.add('tarjeta-reseña');
  nuevaReseña.innerHTML = `
    <p>"${mensaje}"</p>
    <span>— ${nombre}${ocupacion ? ', ' + ocupacion : ''}</span>
  `;

  // Añadimos la nueva reseña a la lista
  listaReseñas.appendChild(nuevaReseña);

  // Limpiamos el formulario
  formReseña.reset();
});




// Inicializar carrito desde localStorage
function obtenerCarrito() {
  let carrito = localStorage.getItem("carrito");
  return carrito ? JSON.parse(carrito) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar guía al carrito
function agregarAlCarrito(nombre, precio) {
  let carrito = obtenerCarrito();
  let item = carrito.find(p => p.nombre === nombre);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }
  guardarCarrito(carrito);
  alert(nombre + " fue agregado al carrito.");
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
  let carrito = obtenerCarrito();
  let lista = document.getElementById("lista");
  let suma = 0;
  lista.innerHTML = "";

  carrito.forEach(item => {
    suma += item.precio * item.cantidad;
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}
      <button class="remove" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("suma").textContent = suma;
}

// Eliminar guía
function eliminarDelCarrito(nombre) {
  let carrito = obtenerCarrito().filter(p => p.nombre !== nombre);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// Finalizar compra
function comprar() {
  let carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  alert("Gracias por tu compra en Órbita. Total: $" + total);
  localStorage.removeItem("carrito");
  mostrarCarrito();
}




// Encapsulado: solo afecta a elementos dentro de "about-page"
document.querySelectorAll('.about-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.backgroundColor = '#fafafa';
  });
  card.addEventListener('mouseleave', () => {
    card.style.backgroundColor = '#fff';
  });
});





// Script para métricas básicas de clics en botones
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("#guia-modelo-widget .gm-btn");
  botones.forEach(btn => {
    btn.addEventListener("click", e => {
      console.log("CTA clickeado:", e.currentTarget.textContent.trim());
      // Aquí puedes integrar Google Analytics, Mixpanel u otra plataforma
    });
  });
});


