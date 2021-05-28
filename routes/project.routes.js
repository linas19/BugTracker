const { authJwt } = require("../middlewares");
const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/projects", [authJwt.verifyToken, authJwt.isModerator], controller.newProject)
  app.get("/api/auth/projects", [authJwt.verifyToken, authJwt.isModerator], controller.showProjects)
  
};