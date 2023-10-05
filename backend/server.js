const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"};

app.use(cors(corsOptions));

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

  app.use(function(req, res, next){
    res.setHeader(
        "Access-Control-Allow-Origin",
        '*'
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
    );
    next();
  });

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


//routes
const userRoute = require('./app/routes/user.routes');
const authRoute = require('./app/routes/auth.routes');

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/api/test', userRoute);
app.use('/api/auth', authRoute);

module.exports = app;

// function initial() ?