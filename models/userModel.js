const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath,
            autoload: true });
        } else {
            //in memory
            this.db = new Datastore();
        }
    }
    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            name: 'Stacey',
            user: 'scamer300',
            password:
            '$2a$10$c3b5zBIfap9H9oXwqKq5.eYDx/Q2LG2duAUWfTyjLOQJIomvtwuMe'
        });
        console.log('Stacey inserted into db');
        return this;
    }
    create(fname, username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
                name: fname,
                user: username,
                password: hash,
            };
            console.log('new user', fname ,'added to db')
            that.db.insert(entry, function (err) {
            if (err) {
            console.log("Can't insert user: ", username);
            }
            });
        });
    }
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

    getAllUsers() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, user) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(user);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', user);
                }
            })
        })
    }
}
const dao = new UserDAO();
dao.init();

module.exports = dao;