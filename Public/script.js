document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userRole', data.rol);
            localStorage.setItem('userName', data.nombre);
            
            alert('Bienvenido al Sistema: ' + data.nombre);
            
            window.location.href = 'dashboard.html'; 
        } else {
            alert('Error de acceso: ' + data.message);
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
        alert('No se pudo establecer conexión con el servidor institucional.');
    }
});