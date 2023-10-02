const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(
    corsOptions));

// parse request of content type - application / json
app.use(bodyParser.json());

// parse request of content type - application/x-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// database
const db = require("./app/models");

// force: true will drop the table if it already exists
db.sequelize.sync({force: true})
.then(() => {
  console.log("Drop et Synced database with force true");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// simple route
app.get("/", (req, res) => {
  res.json({message: "Coucou"});
});

//routes
require('./app/routes/user.routes');
require('./app/routes/auth.routes');

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() ?