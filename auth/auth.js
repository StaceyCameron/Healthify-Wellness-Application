const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = function (req, res,next) {
  //require username and password from user input
  let username = req.body.username;
  let password = req.body.password;

  userModel.lookup(username, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send("401 User not found");
    }
    if (!user) {
      console.log("user ", username, " not found");
      return res.status(401).send("401 User not found");
    }
    //compare posted password with database password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let payload = { username: username };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 300}); 
        res.cookie("jwt", accessToken);
        console.log("Session started for", username);
        next();
      } else {
        return res.status(401).send("401 Username/Password incorrect");;
      }
    });
  });
};

//verify user is logged in
exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.render("user/login");
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
    console.log("User verified")
  } catch (e) {
    console.log("error occurred during verification")
    res.render("user/login");
  }
};
