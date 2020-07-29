const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
router.use(cors());

process.env.SECRET_KEY = "secret";

router.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    email: req.body.email,
    password: req.body.password,
    job_position: req.body.job_position,
    created: today,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + " Registered!" });
            })
            .catch((err) => {
              res.send(error + ":" + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          // res.send(token)
          res.json({ token: token });
        } else {
          res.json({ error: "Password does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/get", (req, res) => {
  User.findAll({
    attributes: ["user_id", "email", "job_position", "user_created"],
  })
    .then((user) => {
      if (user) {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.delete("/delete/:id", (req, res) => {
  User.destroy({
    where: {
      user_id: req.params.id,
    },
  }).then(() => {
    res.json(req.params.id);
  });
});

router.put("/update/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body.user_fname);
  if (req.body.user_pass != "") {
    bcrypt.hash(req.body.user_pass, 10, (err, hash) => {
      User.update(
        {
          email: req.body.user_email,
          password: hash,
          job_position: req.body.job_position,
        },
        {
          where: {
            user_id: req.params.id,
          },
        }
      ).then(() => {
        res.json(req.params.id);
      });
    });
  } else {
    User.update(
      {
        email: req.body.user_email,
        job_position: req.body.job_position,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    ).then(() => {
      res.json(req.params.id);
    });
  }
});

module.exports = router;
