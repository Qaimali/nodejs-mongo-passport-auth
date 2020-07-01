const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");
var app = express();
app.use(cors());
require("dotenv").config();
//db connections
const connectionstr = process.env.MONGO_DB || "mongodb://localhost:27017/Login";
mongoose
  .connect(connectionstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

require("./auth/auth");

app.use(bodyParser.json({ type: "*/*" }));

const routes = require("./routes/auth.routes");
const secureRoute = require("./routes/user.routes");

app.use("/auth", routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(4000, () => {
  console.log("Server started");
});
