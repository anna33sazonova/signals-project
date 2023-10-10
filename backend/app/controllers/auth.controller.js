const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*
exports.signup = (req, res) => {
  console.log('sing Up')
  // bcrypt.hash - fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    console.log(user);
    user.save()
    .then(() => res.status(201).json({message: 'User is successfully created'}))
    .catch(err => {
      res.status(400).json({err})
    });
  })
  .catch(err => {
    res.status(500).json({err})
  });
}


exports.signin = (req, res) => {
  // promise
User.findOne({
  where: {
    username: req.body.username,
   // password: req.body.password
  }
})
  .then(user => {
    if(user === null){
      res.status(401).json({message: 'Username and/or password are incorrect'});
    } else {
      // promise

      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if(!valid){
          res.status(401).json({message: 'Username and/or password are incorrect'})
        } else {
          res.status(200).json({
            id: user.id,
            token: jwt.sign(
                {id: user.id},
                config.secret,
                {expiresIn: '24h'})
          });
        }
      })
      .catch(err => {
        res.status(500).json({err});
      })
    }
  })
  .catch(err => {
    res.status(500).json({err});
  })
}
 */

exports.singup = async (req, res) => {
  //Save user to database
try {
  const salt = bcrypt.genSaltSync(8);
  const password = req.body.password;
  await  User.create({
    username: req.body.username,
    email: req.body.email,
    // hash OR hashSync bcrypt.hash(req.body.password, salt)
    // password: bcrypt.hash(password, salt)
    password:  req.body.password
  });
  return res.status(200).send({
    message: "Your registration is successful"
  });
}
  catch(err) {
    res.status(500).send({message: err.message});
  }
};


// exports.signup = async (req, res) => {
//   const salt = await bcrypt.genSaltSync(8);
//   const password = await req.body.password;
//   const user = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hash(password, salt)
//   })
//   try {
//     await user.save()
//     res.status(200).send({
//       message: "Your registration is successful"
//     })
//   } catch (err) {
//     res.status(500).send({message: err.message});
//   }
// }


exports.singin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    console.log(user);
    console.log(req.body);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }
   // const passwordIsValid = bcrypt.compareSync(
    //    req.body.password,
    //    user.password
  //  );
  //   if (req.body.password !== user.password) {
  //     return res.status(401).send({
  //       accessToken: null,
  //       message: "Invalid Password!"
  //     });
  //   }

    return res.status(200).json({
      id: user.id,
      message: 'Login success',
      token: jwt.sign(
          {id: user.id}, config.secret
      )
    });
  } catch (err) {
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