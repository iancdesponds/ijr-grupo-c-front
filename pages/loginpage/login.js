document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const button = document.getElementById('login-button');

    button.classList.add('animate-pulse');
    setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1000);

    fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = 'loja.html';
    })
    .catch(e => {
        showPopUp(e);
    });
});