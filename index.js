const bodyParser = require("body-parser");
const express = require("express");
const express_session = require("express-session");
const path = require("path");
const expressHbs = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(express_session({ secret: process.env.SECRET || 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", (req, res) => res.send("Hello world"));

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
