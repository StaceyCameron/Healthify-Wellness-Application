const userDao = require('../models/userModel.js');
const goalsDAO =require('../models/goalsModels.js')

//create instance and initialise goals database
const db = new goalsDAO();
db.init();

//Display homepage, about us and wellbeing information
exports.show_landing_page = function(req, res) {
    res.render("landing");
}

exports.show_about_page = function(req, res) {
    res.render("about");
}

exports.show_info_page = function (req, res) {
    res.render("info");
}

//Register New User Functionality
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

//User Login Functionality
exports.show_login_page = function(req, res) {
    res.render("user/login");
}

exports.handle_login = function (req, res) {
    db.getAllGoals()
      .then((list) => {
        res.render("goals", {
          title: "Goals",
          user: "user",
          goals: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
    console.log("jwt cleared session ended")
};

//Goals Creation and Tracking Functionality
exports.show_goals_page = function (req, res) {
    let user = req.params.user;
    db.getAllGoals(user)
      .then((list) => {
        res.render("goals", {
          title: "Goals",
          user: "user",
          goal: list,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
}

exports.create_new_goal = function (req, res) {
    console.log("processing new goal");
    if (!req.body.category) {
       response.status(400).send("Entries must have a category.");
       return;
    }
    db.addGoal(req.body.category, req.body.description, req.body.due, req.body.author);
    res.redirect("/goals");
    db.getAllGoals();
    console.log("redirect to goals");
};

exports.show_user_goals = function (req, res) {
    let user = req.params.user;
    db.getGoalsByUser(user)
      .then((list) => {
        res.render("goals", {
          title: "Goals",
          user: user,
          goals: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };

exports.delete_goal = function (req, res) {
    let user = req.params.user;
    let goalID = req.params._id;
    db.deleteGoal(user, goalID);
    res.redirect("/goals");
    db.getAllGoals();
    console.log("redirect to goals");
}

exports.update_goal = function (req, res) {
    let user = req.user.user;
    let goalID = req.params._id;
    db.updateGoal(user, goalID)
     .then((list) => {
        res.render("goals", {
          title: "Edit Goal",
          user: user,
          goal: list,
        });
      })
     .catch((err) => {
        console.log("promise rejected", err);
      });
  };

exports.show_complete_page = function (req, res) {
  db.getCompletedGoals()
    .then((list) => {
      res.render("complete", {
        title: "Goals",
        user: "user",
        goal: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
}

exports.mark_goal_complete = function (req, res) {
  let user = req.user.user;
  let goalID = req.params._id;
  db.markGoalComplete(user, goalID);
  res.redirect("/goals");
  db.getAllGoals();
  console.log("redirect to goals");
}
