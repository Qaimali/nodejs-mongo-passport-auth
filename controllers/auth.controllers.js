const UserModel = require("../models/user");

exports.signup = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const last_name = req.body.last_name;
  const first_name = req.body.first_name;
  if (!password) {
    return res.status(404).send({ status: 404,message: "You must provide password" });
  }
  if (!email) {
    return res.status(404).send({ status: 404,message: "You must provide Email" });
  }
  if (!last_name) {
    return res.status(404).send({ status: 404,message: "You must provide Last Name" });
  }
  if (!first_name) {
    return res.status(404).send({ status: 404,message: "You must provide First Name" });
  }
  if (!phone_number) {
    return res.status(404).send({ status: 404,message: "You must provide Phone Number" });
  }
  UserModel.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 500,message: "Failed to register , Please try again" });
    }

    if (existingUser) {
      return res.status(422).send({ status: 404,message: "Email is in use" });
    }

    const user = UserModel.create({
      email,
      password,
      last_name,
      phone_number,
      first_name,
    });
    user
      .then((data) => {
        res.json({
          message: "Signup successful",
          user: data,
	status:200
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ status: 500,message: "Failed to register , Please try again" });
      });
  });
};
