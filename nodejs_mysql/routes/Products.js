const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Product = require("../models/Product");

router.use(cors());

process.env.SECRET_KEY = "secret";

// router.post("/addimg", upload.single("product_img"), (req, res) => {
//   console.log(req.file);
// });

router.post("/add", upload.single("product_img"), (req, res) => {
  const today = new Date();

  const productData = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_amount: req.body.product_amount,
    product_img: req.file.filename,
    uid_editor: req.body.uid_editor,
    last_edited: today,
  };

  console.log(productData);
  Product.create(productData)
    .then((product) => {
      res.json({ status: product });
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.delete("/delete/:id", (req, res) => {
  Product.destroy({
    where: {
      product_id: req.params.id,
    },
  }).then(() => {
    res.json(req.params.id);
  });
});

router.get("/get", (req, res) => {
  const today = new Date();

  Product.findAll({
    attributes: [
      "product_id",
      "product_name",
      "product_price",
      "product_amount",
      "product_img",
      "uid_editor",
      "last_edited",
    ],
  })
    .then((product) => {
      if (product) {
        res.json({ product: product });
      } else {
        res.json({ productMessage: "product not found" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/get/:id", (req, res) => {
  const today = new Date();

  Product.findOne({
    where: {
      product_id: req.params.id,
    },
  })
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.json({ productMessage: "product not found" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.put("/update/:id", upload.single("product_img"), (req, res) => {
  const today = new Date();

  Product.findOne({
    where: {
      product_id: req.params.id,
    },
  })
    .then((product) => {
      if (product) {
        if (req.file) {
          Product.update(
            {
              product_name: req.body.product_name,
              product_price: req.body.product_price,
              product_amount: req.body.product_amount,
              product_img: req.file.filename,
              uid_editor: req.body.uid_editor,
              last_edited: today,
            },
            {
              where: {
                product_id: req.params.id,
              },
            }
          ).then(() => {
            Product.findOne({
              where: {
                product_id: req.params.id,
              },
            }).then((product) => {
              if (product) {
                res.json(product);
              } else {
                res.json({ productMessage: "product not found" });
              }
            });
          });
        } else {
          Product.update(
            {
              product_name: req.body.product_name,
              product_price: req.body.product_price,
              product_amount: req.body.product_amount,
              uid_editor: req.body.uid_editor,
              last_edited: today,
            },
            {
              where: {
                product_id: req.params.id,
              },
            }
          ).then(() => {
            Product.findOne({
              where: {
                product_id: req.params.id,
              },
            }).then((product) => {
              if (product) {
                res.json(product);
              } else {
                res.json({ productMessage: "product not found" });
              }
            });
          });
        }
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
