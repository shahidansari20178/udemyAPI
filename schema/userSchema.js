const Sequelize = require('sequelize');
const {db} = require('../config/database');

const User = db.define('tblUser',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false
    },user_image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lastLogin: {
        type: Sequelize.DATE,
        allowNull: true
    },
    isLogged: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    user_role: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

User.sync({force: false}).then((res) => {
    console.log('User Table Created Successfully');
}).catch((err) => {

    console.log('Error While Creating User Table');
})

module.exports = User;