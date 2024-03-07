document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("aqui");
    fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            return response.json();
        }
    })
    .then(data => {
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
});