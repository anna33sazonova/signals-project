const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.singup = (req, res) => {
  //Save user to database

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  });
};
exports.singin = (req, res) => {
User.findOne({
  where: {
    username: req.body.username
  }
})
  .then(user => {
    if(!user){
      return res.status(404).send({message: "User not found"});
    }
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if(!passwordIsValid){
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({id: user.id}, config.secret, {
      expireIn: 86400 // 24 hours
    });
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  });
};