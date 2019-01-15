//const Fruits = require('../schema/fruitsSchema');
const User = require('../schema/userSchema');
const myTables = [
    {route: "user", table: User}
]

exports.post = (routeName, body, done) => {
    let table = myTables.filter(i => i.route === routeName)
    if (table && table.length > 0) {
        table[0].table.create(body).then((newData) => {
            if (newData) {
                done(null, newData);
            }
        }).catch((err) => {
            done(err);
        })
    } else {
        done({message: "No Table Found"});
    }
}

exports.getAll = (routeName, done) => {
    let table = myTables.filter(i => i.route === routeName)
    if (table && table.length > 0) {
        table[0].table.findAll().then((getFruits) => {
            if (getFruits) {
                done(null, getFruits);
            }
        }).catch((err) => {
            done(err);
        });
    } else {
        done({message: "No Table Found"});
    }
}