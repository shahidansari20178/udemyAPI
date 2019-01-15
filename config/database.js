const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.db = new Sequelize('udemy', 'root', 'root', {
    host: 'localhost',
    port:8889,
    dialect: 'mysql',
    operatorsAliases: Op,
});

if(exports.db){
    console.log("Database connection done successfully!!!");
}
