const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const DeletedToken = db.deletedToken;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if(!req.body.username || !req.body.email || !req.body.contact || !req.body.address || !req.body.gender || !req.body.country || !req.body.password){
    res.status(422).send({ message: 'params missing' });
    return
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    gender: req.body.gender,
    country: req.body.country,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User is registered successfully!" });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};

exports.logout = (req, res) => {
  let token = req.headers["x-access-token"];

  const deletedToken = new DeletedToken({
    token: token
  });

  deletedToken.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      message: "User logged out."
    });
  });
};
