var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

var Users = require("./routes/Users");
var Profiles = require("./routes/Profiles");
var Products = require("./routes/Products");

app.use("/users", Users);
app.use("/profiles", Profiles);
app.use("/product", Products);

app.use('/uploads', express.static('uploads'))

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
