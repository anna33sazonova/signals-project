const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller")

module.exports = function(app){
  app.use(function (req, res, next){
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  //todo change userBoard to info
  app.get("api/test/info", [authJwt.verifyToken], controller.userBoard);
}