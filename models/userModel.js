const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({ filename: dbFilePath,
            autoload: true });
        } else {
            this.db = new Datastore();
            console.log('user db created');
        }
    }
    
    //Initialise the user database
    init() {
        //set up user for testing purposes
        this.db.insert({
            user: 'stacey',
            password:
            '$2a$10$c3b5zBIfap9H9oXwqKq5.eYDx/Q2LG2duAUWfTyjLOQJIomvtwuMe'
        });
        console.log('stacey inserted into user db');
        return this;
    }
    //create new user and hash the password
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
                user: username,
                password: hash,
            };
            console.log('new user', username ,'added to db')
            that.db.insert(entry, function (err) {
            if (err) {
            console.log("Can't insert user: ", username);
            }
            });
        });
    }
    //search for a user
    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
        if (err) {
            return cb(null, null);
        } else {
            if (entries.length == 0) {
                return cb(null, null);
            }
                return cb(null, entries[0]);
            }
        });
    }

    //get all users
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, user) {
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
const dao = new UserDAO();
dao.init();

module.exports = dao;