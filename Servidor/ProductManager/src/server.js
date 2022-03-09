const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


require('./app/rutas/app.rutas.js')(app);

mongoose.Promise = global.Promise;
mongoose.connect(YOUR_MONGODB_URL,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({ message: "200 OK", status: "El servidor se esta ejecutando correctamente"} );
});

let PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
