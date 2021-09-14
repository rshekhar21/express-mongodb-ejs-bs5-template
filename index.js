require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const port = process.env.PORT || 3000;
const cnstr = process.env.DB_CONNECTIONSTRING || "mongodb://localhost/mydb";
const log = console.log;

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", router);

app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/chngpwd", (req, res) => res.render("chngpwd"));

mongoose
  .connect(cnstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      port,
      log(
        "mongodb conneted,",
        `express server started at http://localhost:${port}`
      )
    );
  })
  .catch((err) => log(err));
