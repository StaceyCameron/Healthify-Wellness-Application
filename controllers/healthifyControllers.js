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