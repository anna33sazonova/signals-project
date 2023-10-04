const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

// const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.singup = async (req, res) => {
  //Save user to database
try {
  const user = await  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  return res.status(200).send({
    message: "Your registration is successful"
  });
}
  catch(err) {
    res.status(500).send({message: err.message});
  }
};

exports.singin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if(!user){
      return res.status(404).send({message: "User not found"});
  }
   const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if(!passwordIsValid){
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const token = jwt.sign({id: user.id}, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expireIn: 86400 // 24 hours
    });
    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
  catch(err) {
    res.status(500).send({message: err.message});
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You have been singed out"
    });
  } catch (err) {
    this.next(err);
  }
};