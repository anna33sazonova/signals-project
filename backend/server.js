const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(
    corsOptions));

// parse request of content type - application/json
app.use(bodyParser.json());

// parse request of content type - application/x-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    cookieSession({
name:"signals-cookie",
      keys: ["COOKIE_SECRET"],
      httpOnly: true,
    })
);

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
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() ?