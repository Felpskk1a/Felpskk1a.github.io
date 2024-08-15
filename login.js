// login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Usuário e senha fixos para demonstração
    const validUsername = 'usuario';
    const validPassword = 'senha123';

    if (username === validUsername && password === validPassword) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redireciona para a página inicial
    } else {
        document.getElementById('error').textContent = 'Usuário ou senha inválidos.';
    }
});