document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (isbn.trim() === '') {
            alert('Por favor, insira um ISBN.');
            return;
        }

        // Salvar o livro no Local Storage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({ title, author, isbn });
        localStorage.setItem('books', JSON.stringify(books));

        // Limpar os campos do formulário
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

        // Gerar código de barras
        document.getElementById('barcode').innerHTML = '';
        JsBarcode("#barcode", isbn, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true
        });
        localStorage.removeItem('books');
        alert('Livro cadastrado com sucesso!');
    });
});
