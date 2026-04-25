// ESPERAR A QUE CARGUE EL DOM
document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // LOGIN
    // =========================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // 🔥 ADMIN FIJO
            if (email === "admin" && password === "admin") {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Administrador');

                window.location.href = 'inicio.html';
                return;
            }

            // 🔹 USUARIOS REGISTRADOS
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            user.correo === email && user.password === password

            if (usuarioValido) {
                localStorage.setItem('userRole', usuarioValido.role || 'user');
                localStorage.setItem('userName', usuarioValido.nombre);


                window.location.href = 'inicio.html';
            } else {
                alert("❌ Usuario o contraseña incorrectos");
            }
        });
    }

    // =========================
    // REGISTRO
    // =========================
    const registroForm = document.getElementById('registroForm');

    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const password = document.getElementById('passwordReg').value.trim();

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            const existe = usuarios.find(user => user.correo === correo);

            if (existe) {
                alert("⚠️ Este usuario ya está registrado");
                return;
            }

            const nuevoUsuario = {
                nombre,
                correo,
                password,
                role: "user"
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert("✅ Registro exitoso");
            window.location.href = 'index.html';
        });
    }

    // =========================
    // PEDIDOS
    // =========================
    const pedidoForm = document.getElementById('pedidoForm');

    if (pedidoForm) {
        pedidoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const producto = document.getElementById('producto').value;
            const cantidad = document.getElementById('cantidad').value;
            const mensaje = document.getElementById('mensaje').value;

            const pedido = { producto, cantidad, mensaje };

            let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            pedidos.push(pedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidos));

            document.getElementById('respuesta').innerText = "✅ Pedido enviado correctamente";
            pedidoForm.reset();
        });
    }

    // =========================
    // NAVEGACIÓN (MENÚ)
    // =========================
    document.querySelectorAll('.menu a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const section = e.target.dataset.section;

            document.querySelectorAll('.seccion').forEach(sec => {
                sec.classList.remove('activa');
            });

            document.getElementById(section).classList.add('activa');
        });
    });

});

// LOGOUT
// =========================
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {

        // Elimina datos de sesión
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirige al login
        window.location.href = 'index.html';
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // MAPA (LA BELLEZA - ESPOCH)
    // =========================
    const mapContainer = document.getElementById('map');

    if (mapContainer) {

        // Coordenadas EXACTAS
        const lat = -0.6357312;
        const lon = -77.0409702;

        window.miMapa = L.map('map').setView([lat, lon], 16);

        // Mapa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(window.miMapa);

        // Marcador principal
        L.marker([lat, lon])
            .addTo(window.miMapa)
            .bindPopup("<b>Finca Experimental La Belleza 🌱</b><br>ESPOCH")
            .openPopup();

        // 🔥 AJUSTE IMPORTANTE (evita mapa gris)
        setTimeout(() => {
            window.miMapa.invalidateSize();
        }, 300);
    }

});
//==================================
//BOT ASISTENTE
//=================================
function responder() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatBox");

    const texto = input.value.toLowerCase().trim();
    if (texto === "") return;

    // Mostrar mensaje usuario
    chat.innerHTML += `<div class="mensaje usuario">${input.value}</div>`;

    let respuesta = generarRespuesta(texto);

    // Simular tiempo de respuesta (IA)
    setTimeout(() => {
        chat.innerHTML += `<div class="mensaje bot">${respuesta}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);

    input.value = "";
}

// 🔥 IA SIMULADA
function generarRespuesta(texto) {

    if (texto.includes("hola")) {
        return "Hola 👋 ¿En qué puedo ayudarte sobre la pitahaya?";
    }

    if (texto.includes("precio")) {
        return "El precio varía según el tipo. La pitahaya amarilla suele ser más costosa.";
    }

    if (texto.includes("beneficios")) {
        return "La pitahaya es rica en fibra, vitamina C y antioxidantes 💪";
    }

    if (texto.includes("comprar") || texto.includes("pedido")) {
        return "Puedes hacer tu pedido en la sección de consultas 🛒";
    }

    if (texto.includes("tipos")) {
        return "Tenemos pitahaya roja, amarilla y blanca.";
    }

    if (texto.includes("ecuador")) {
        return "Ecuador es uno de los principales exportadores de pitahaya 🌎";
    }

    if (texto.includes("gracias")) {
        return "¡Con gusto! 😊";
    }

    // RESPUESTA POR DEFECTO
    return "No entendí tu pregunta 🤔 Intenta preguntar sobre precios, beneficios o tipos.";
}

document.getElementById("userInput")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            responder();
        }
    });

window.onload = () => {
    const chat = document.getElementById("chatBox");
    chat.innerHTML += `<div class="mensaje bot">Hola 👋 soy tu asistente de pitahaya ¿En qué puedo ayudarte?</div>`;
};
function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.classList.toggle("oculto");
}

function toggleFicha(btn) {
    const ficha = btn.nextElementSibling;
    ficha.classList.toggle('oculto');
}



const buscador = document.getElementById('buscar');

buscador.addEventListener('keyup', function() {
    let filtro = buscador.value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let texto = card.innerText.toLowerCase();
        card.style.display = texto.includes(filtro) ? '' : 'none';
    });
});

// REDIRECCION
function ir(pagina){
    window.location.href = pagina;
}



/* =========================
   DETECTAR TIPO DE PITAHAYA
========================= */

// Ejemplo de URLs:
// tipos/roja.html
// tipos/amarilla.html

const ruta = window.location.pathname;
const archivo = ruta.split("/").pop().replace(".html", "");

/* =========================
   DATOS DE CADA PITAHAYA
========================= */

const pitahayas = {

    roja: {
        nombre: "Pitahaya Roja",
        imagen: "../img/pitahaya-roja.png"
    },

    rosa: {
        nombre: "Pitahaya Rosa",
        imagen: "../img/pitahaya-rosa.png"
    },

    amarilla: {
        nombre: "Pitahaya Amarilla",
        imagen: "../img/pitahaya-amarilla.png"
    },

    golden: {
        nombre: "Pitahaya Golden",
        imagen: "../img/pitahaya-golden.png"
    }

};

/* =========================
   CARGAR DATOS EN HTML
========================= */

const data = pitahayas[archivo];

if (data) {
    document.querySelector(".card-img img").src = data.imagen;
    document.querySelector(".card-img h2").innerText = data.nombre;
}

/* =========================
   OPCIONAL: VALORES DE EJEMPLO
========================= */

// Si luego quieres agregar valores reales:
const valores = document.querySelectorAll(".item");

valores.forEach((item, i) => {
    item.innerHTML += " <strong>: ---</strong>"; 
});


