// login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Usuário e senha fixos para demonstração
    const validUsername = '000112245856';
    const validPassword = 'Cardeal2023@';

    // Usuário e senha para administrador, para demontração
    const adminUsername = 'admin123';
    const adminPassword = 'admin123123';

    
    
    
    if (username === adminUsername && password === adminPassword) {
        alert('Login bem-sucedido!');
        window.location.href = 'admin.html'; // Redireciona para admin
    } else if (username === validUsername && password === validPassword) {
        alert('Login bem-sucedido');
        window.location.href = 'index.html'; //manda para a pagina inicial
    } else {
        document.getElementById('error').textContent = 'Usuário ou senha invalidos.';
    }
        
});
