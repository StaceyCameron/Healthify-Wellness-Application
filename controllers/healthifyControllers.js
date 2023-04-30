exports.show_landing_page = function(req, res) {
    res.render("home");
}

exports.show_about_page = function(req, res) {
    res.render("about");
}

exports.show_register_page = function(req, res) {
    res.render("register");
}

exports.show_login_page = function(req, res) {
    res.render("login");
}

exports.show_info_page = function (req, res) {
    res.render("info");
}

exports.show_goals_page = function (req, res) {
    res.render("goals");
}

exports.show_achievements_page = function (req, res) {
    res.render("achievements");
}