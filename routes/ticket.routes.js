const { authJwt } = require("../middlewares");
const controller = require("../controllers/ticket.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/tickets", [authJwt.verifyToken], controller.newTicket)
  app.get("/api/auth/tickets", [authJwt.verifyToken], controller.showTickets)
  
};