const UserModel = require("../models/user");

exports.signup = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  UserModel.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Failed to register , Please try again" });
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = UserModel.create({ email, password });
    user
      .then((data) => {
        res.json({
          message: "Signup successful",
          user: data,
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ error: "Failed to register , Please try again" });
      });
  });
};
