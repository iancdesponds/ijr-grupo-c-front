document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const button = document.getElementById('register-button');

        button.classList.add('animate-pulse');
        setTimeout(() => {
            button.classList.remove('animate-pulse');
          }, 1000);
    

        if (password !== confirmPassword) {
            showPopUp("As senhas não coincidem.");
            return;
        }

        const userData = {
            email: email,
            password: password,
        };

        fetch('http://localhost:8000/registro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(async response => {
            if (!response.ok) {
                return await response.json().then(data => {
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            showPopUp('Registro concluído com sucesso!');
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html'; 
        })
        .catch(error => {
            console.error('Erro:', error);
            showPopUp(error.message);
        });
    });
});
