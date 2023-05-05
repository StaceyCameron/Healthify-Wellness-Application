const userDao = require('../models/userModel.js');

exports.show_landing_page = function(req, res) {
    res.render("landing");
}

exports.show_about_page = function(req, res) {
    res.render("about");
}

exports.show_info_page = function (req, res) {
    res.render("info");
}

exports.show_goals_page = function (req, res) {
    res.render("goals");
}

exports.show_complete_page = function (req, res) {
    res.render("complete");
}

//Register New User
exports.show_register_page = function(req, res) {
    res.render("user/register");
}

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function(err, u) {
    if (u) {
        res.send('401 Username already used, please try again.');
        console.log("Username already exists.")
        return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    userDao.getAllUsers();
    res.redirect('/login');
    });
}

//User Login
exports.show_login_page = function(req, res) {
    res.render("user/login");
}

exports.handle_login = function (req, res) {
    res.redirect("/");
  };

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
    console.log("jwt cleared session ended")
};
