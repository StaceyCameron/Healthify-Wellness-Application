const nedb = require('nedb');

class goals {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        console.log("goals db created")
        }
        }
//Initialise the goals database
init() {
    this.db.insert({
        category: "Fitness",
        description: "Run 5k",
        date: "2023-05-10",
        author: "Stacey",
        complete: false
    });
    
    this.db.insert({
        category: "Nutrition",
        description: "Eat 1800 calories",
        date: "2023-05-10",
        author: "Stacey", 
        complete: false      
    });

    this.db.insert({
        category: "Lifestyle",
        description: "Sleep 7 Hours",
        date: "2023-05-05",
        author: "Stacey", 
        complete: true      
    });

    this.db.insert({
        category: "Nutrition",
        description: "Eat 3000 calories",
        date: "2023-05-05",
        author: "Stacey", 
        complete: true      
    });

    this.db.insert({
        category: "Fitness",
        description: "Leg day",
        date: "2023-05-05",
        author: "Stacey", 
        complete: true      
    });
    console.log('new goals added for stacey');
}

//add new goal to goals database
addGoal(category, description, author) {
    var goal = {
    category: category,
    description: description,
    date: new Date().toISOString().split('T')[0],
    author: author,
    complete: false,
    goalID: this.db._id 
    }    
    console.log('new goal created', goal);
    this.db.insert(goal, function(err, doc) {
    if (err) {
    console.log('Error inserting document', subject);
    } else {
    console.log('document inserted into the database', doc);
    }
    }) 
}

//show goals by user
getGoalsByUser(user) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'author': user }, function(err, entries) {
        if (err) {
            reject(err);
        } else {
            resolve(entries);
        console.log('getGoalsByUser() returns: ', entries);
    }
})
})
}

//show all goals in database
getAllGoals() {
    return new Promise((resolve, reject) => {
        this.db.find({'complete': false}, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
                console.log('function all() returns: ', user);
            }
        })
    })
}

//delete goal from database
deleteGoal(goalId) {
    return new Promise((resolve, reject) => {
        console.log('processing delete goal')
        this.db.remove({ 'id': goalId }, {}, function(err, goalRemoved) {
            if (err) {
                reject(err);
                console.log("Error deleting goal")
            } else {
                resolve(goalRemoved);
                console.log('Goal deleted successfully', goalRemoved);
            }
        })
    })
}

//update goal details in database
updateGoal(goalId, category, description, date, author) {
    return new Promise((resolve, reject) => {
        this.db.update({ '_id': goalId }, {
            $set: {
                category: category,
                description: description,
                date: date,
                author: author
            }
        }, function(err, user) {
            if (err) {
                reject(err);
                console.log("Error updating goal")
            } else {
                resolve(user);
                console.log('Goal updated successfully');
            }
        })
    })
}

markGoalComplete(goalId) {
    return new Promise((resolve, reject) => {
        this.db.update({ 'id': goalId }, {
            $set: {
                completed: true
            }
        }, function(err, user) {
            if (err) {
                reject(err);
                console.log("Error marking goal as complete")
            } else {
                resolve(user);
                console.log('Goal updated to complete successfully');
            }
        })
    })
}

//show completed goals in database
getCompletedGoals() {
    return new Promise((resolve, reject) => {
        this.db.find({ 'complete': true }, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
                console.log('function all() returns: ', user);
            }
        })
    })
}

}

module.exports = goals;