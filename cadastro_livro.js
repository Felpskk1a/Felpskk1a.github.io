// cadastro_livro.js

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const isbn = document.getElementById('isbn').value;

        // Verifique se o ISBN não está vazio
        if (isbn.trim() === '') {
            alert('Por favor, insira um ISBN.');
            return;
        }

        // Limpar código de barras anterior
        document.getElementById('barcode').innerHTML = '';

        // Gerar código de barras
        JsBarcode("#barcode", isbn, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true
        });
    });
});
