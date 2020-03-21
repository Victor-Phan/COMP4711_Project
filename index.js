const bodyParser = require("body-parser");
const express = require("express");
const express_session = require("express-session");
const path = require("path");
const expressHbs = require("express-handlebars");
const methodOverride = require("method-override");

const { authRoutes, postsRoutes, searchRoutes } = require("./routes");
const { authHandlers, errorHandlers } = require("./utils");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express_session({
    secret: process.env.SECRET || "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

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

app.use(authRoutes);

// This must be after authentication routes and before secure routes
app.use("/*", authHandlers.checkSignin);
app.use("/*", (err, req, res, next) => {
  if (err) {
    if (err.message === "User not signed in") {
      return res.redirect("/signin");
    }
    next(err);
  } else {
    next();
  }
});

app.get("/", (req, res) => res.render("home", {}));

app.use(postsRoutes);
app.use(searchRoutes);

app.use(errorHandlers.errorLogger);
app.use(errorHandlers.clientErrorHandler);
app.use(errorHandlers.errorHandler);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
