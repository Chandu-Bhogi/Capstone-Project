const auth = require("./v1/auth");

module.exports = (app) => {
  app.use("/v1/auth", auth);
};
