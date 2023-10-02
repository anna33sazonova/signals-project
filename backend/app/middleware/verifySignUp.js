const db = require("../models");
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {

  //Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username already exists"
      });
    }

    //Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email already exists"
        });
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUserNameOrEmail: checkDuplicateUserNameOrEmail
}