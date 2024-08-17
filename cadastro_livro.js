// cadastro_livro.js

// Configuração do QuaggaJS
Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#interactive')    // Área onde o vídeo será exibido
    },
    decoder : {
        readers : ["ean_reader"] // Padrão de código de barras comum para ISBN (EAN-13)
    }
}, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("QuaggaJS initialized");
    Quagga.start();
});

// Captura o código de barras lido e coloca no campo de texto
Quagga.onDetected(function(result) {
    const code = result.codeResult.code;
    document.getElementById('barcodeInput').value = code;
    Quagga.stop(); // Parar a leitura após capturar o código
});

document.getElementById('fetchBookInfo').addEventListener('click', function() {
    const isbn = document.getElementById('barcodeInput').value;

    if (isbn.trim() === '') {
        alert('Por favor, insira um código de barras.');
        return;
    }

    // Função para buscar dados da Open Library
    function fetchFromOpenLibrary() {
        return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
            .then(response => response.json())
            .then(data => {
                const key = `ISBN:${isbn}`;
                if (data[key]) {
                    return {
                        title: data[key].title || '',
                        author: data[key].authors ? data[key].authors.map(author => author.name).join(', ') : ''
                    };
                }
                return null;
            });
    }

    // Função para buscar dados da Google Books
    function fetchFromGoogleBooks() {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const book = data.items[0].volumeInfo;
                    return {
                        title: book.title || '',
                        author: book.authors ? book.authors.join(', ') : ''
                    };
                }
                return null;
            });
    }

    // Tenta buscar as informações em Open Library e, se não encontrar, tenta Google Books
    fetchFromOpenLibrary()
        .then(result => {
            if (result) {
                document.getElementById('title').value = result.title;
                document.getElementById('author').value = result.author;
                document.getElementById('isbn').value = isbn;
            } else {
                return fetchFromGoogleBooks();
            }
        })
        .then(result => {
            if (result) {
                document.getElementById('title').value = result.title;
                document.getElementById('author').value = result.author;
                document.getElementById('isbn').value = isbn;
            } else {
                alert('Livro não encontrado em ambas as fontes.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar informações do livro:', error);
            alert('Erro ao buscar informações do livro.');
        });
});
