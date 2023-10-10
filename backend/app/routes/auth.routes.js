const {verifySignUp} = require("../middleware/");
const controller = require("../controllers/auth.controller");
const app = require("express");
const router = app.Router();

// module.exports = function(app){
//   app.use(function(req, res, next){
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
// };
  router.post(
      '/signup',
      [
        verifySignUp.checkDuplicateUserNameOrEmail
      ],
      controller.singup
  );

  router.post('/signin', controller.singin);

  router.post('/signout', controller.signout);

module.exports = router;