const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");
const app = require("express");
const router = app.Router();

// module.exports = function(app){
//   app.use(function (req, res, next){
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept");
//     next();
//   });
// };

  router.get("/all", controller.allAccess);

  router.get("/info", [authJwt.verifyToken], controller.userInfo);

  module.exports = router;
