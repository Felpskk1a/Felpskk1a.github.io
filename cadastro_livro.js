// cadastro_livro.js

document.getElementById('fetchBookInfo').addEventListener('click', function() {
    const isbn = document.getElementById('barcodeInput').value;

    if (isbn.trim() === '') {
        alert('Por favor, insira um código de barras.');
        return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then(response => response.json())
        .then(data => {
            if (data.totalItems > 0) {
                const book = data.items[0].volumeInfo;
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.authors ? book.authors.join(', ') : '';
                document.getElementById('isbn').value = isbn;
            } else {
                alert('Livro não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar informações do livro:', error);
            alert('Erro ao buscar informações do livro.');
        });
});

// Resto do código para registro do livro
