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

    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
        .then(response => response.json())
        .then(data => {
            const key = `ISBN:${isbn}`;
            if (data[key]) {
                const book = data[key];
                document.getElementById('title').value = book.title || '';
                document.getElementById('author').value = book.authors ? book.authors.map(author => author.name).join(', ') : '';
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
