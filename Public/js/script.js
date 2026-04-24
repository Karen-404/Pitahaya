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

// =========================
// MAPA CON UBICACIÓN REAL
// =========================
const mapFrame = document.getElementById('mapFrame');

if (mapFrame) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Cargar Google Maps con tu ubicación
            mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;

        }, () => {
            mapFrame.src = "https://www.google.com/maps?q=-0.1807,-78.4678&z=13&output=embed";
        });
    } else {
        mapFrame.src = "https://www.google.com/maps?q=-0.1807,-78.4678&z=13&output=embed";
    }
}