const userDao = require('../models/userModel.js');

exports.show_landing_page = function(req, res) {
    res.render("landing");
}

exports.show_about_page = function(req, res) {
    res.render("about");
}

exports.show_register_page = function(req, res) {
    res.render("user/register");
}

exports.show_login_page = function(req, res) {
    res.render("user/login");
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
exports.post_new_user = function(req, res) {
    const name = req.body.fname;
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
    userDao.create(name, user, password);
    console.log("name", name, "register user", user, "password", password);
    userDao.getAllUsers();
    res.redirect('/login');
    });

}