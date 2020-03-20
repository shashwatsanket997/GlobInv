const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cnst = require("./const");
const router = require("./routes/routes");
const verifyToken = require("./utils/util").verifyToken;
const AuthorizationError = require("./utils/Errors").AuthorizationError;
const CustomError = require("./utils/Errors").CustomError;
const path = require("path");
const cors = require("cors");

const app = express();

// Setting up middlewares

// Setting up CORS
app.use(cors());
// Setting up the logger
app.use(logger("combined"));

// Setting up Static Expose URI
app.use("/images", express.static(path.join("public", "images")));

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyParser.json());

//Auth Verification Middleware
app.use((req, res, next) => {
  //Rremove trailing '/' if present
  let url = req.url.replace(/\/$/, "");
  url = req.url.replace(/^\/api/, "");
  console.log(url);
  if (url === cnst.AUTH_ENDPOINT) {
    return next();
  }
  if (req.method === "GET" && cnst.publicURLs.indexOf(url) > -1) {
    return next();
  }
  // For auth required urls:
  // if req on api endpoint check for JWT token
  let token = req.headers.authorization;
  if (token) {
    try {
      let userObj = verifyToken(token);
      req.user = userObj;
      //making the user available
      return next(); //Good to go
    } catch (err) {
      next(err);
    }
  } else {
    next(new AuthorizationError());
  }
});

// Setting up routes
router(app);

// Setting Up Error Handler
app.use(function(err, req, res, next) {
  // console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.prepareResponse());
  } else {
    return res.status(500).json({ error: err });
  }
});

app.listen(cnst.PORT, () => {
  console.log(`Server running on port ${cnst.PORT}`);
});
