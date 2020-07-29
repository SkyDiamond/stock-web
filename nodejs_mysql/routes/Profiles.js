const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const atob = require("atob");
const Blob = require("cross-blob");

const Profile = require("../models/Profile");

router.use(cors());

process.env.SECRET_KEY = "secret";

router.put("/update/:id", (req, res) => {
  const today = new Date();

  // console.log(b64string)

  const profileData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth_day: req.body.birth_day,
    profile_img: req.body.profile_img,
    user_id: req.body.user_id,
    last_edit: today,
  };

  // console.log(req.body.files)

  Profile.findOne({
    where: {
      user_id: req.params.id,
    },
  })
    .then((profile) => {
      if (!profile) {
        Profile.create(profileData)
          .then((user) => {
            res.json({ status: user });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        console.log(profile)
        if (req.body.profile_img) {
          var b64string = req.body.profile_img.toString().split(",")[1];
          var buf = Buffer.from(b64string, "base64");
          Profile.update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              birth_day: req.body.birth_day,
              profile_img: buf,
              last_edit: today,
            },
            {
              where: {
                user_id: req.params.id,
              },
            }
          ).then(() => {
            res.json({ status: " Update Success!" });
          });
        } else {
          Profile.update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              birth_day: req.body.birth_day,
              last_edit: today,
            },
            {
              where: {
                user_id: req.params.id,
              },
            }
          ).then(() => {
            res.json({ status: " Update Success!" });
          });
        }
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/get/:id", (req, res) => {
  const today = new Date();
  const emptyProfile = {
    first_name: "",
    last_name: "",
    birth_day: "",
    profile_img: "",
    user_id: req.params.id,
    last_edit: today,
  };

  Profile.findOne({
    where: {
      user_id: req.params.id,
    },
  })
    .then((profile) => {
      if (profile) {
        var buffer = new Buffer(profile.profile_img);
        var bufferBase64 = buffer.toString("base64");
        res.json({ profile: profile, profile_img: bufferBase64 });
      } else {
        Profile.create(emptyProfile)
          .then((eProfile) => {
            res.json({ status: eProfile });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// router.get("/profile", (req, res) => {
//   var decoded = jwt.verify(
//     req.headers["authorization"],
//     process.env.SECRET_KEY
//   );

//   Profile.findOne({
//     where: {
//       user_id: decoded.user_id,
//     },
//   })
//     .then((user) => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.send("Profile does not exist");
//       }
//     })
//     .catch((err) => {
//       res.send("error: " + err);
//     });
// });

module.exports = router;
