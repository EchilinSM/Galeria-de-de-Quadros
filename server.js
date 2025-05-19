const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Midleware para servir arquivos estaticos
app.use(express.static(__dirname))

//Body-parser para Ler dados de formularios 
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


// Inicia o servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
