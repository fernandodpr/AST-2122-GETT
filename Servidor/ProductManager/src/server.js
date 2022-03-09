const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.json({"message": "El servidor se está ejecutando correctamente"});
});

let PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
