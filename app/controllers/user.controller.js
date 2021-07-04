const db = require("../models");
const User = db.user;

exports.searchUser = (req, res) => {
	console.log({req})
  User.findOne({
  	$or: [	
    	{ username: req.body.name },
    	{ contact: req.body.contact }
  	]
  })
  	.exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
      	user
      });
    });
};
