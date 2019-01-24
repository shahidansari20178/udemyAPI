const Sequelize = require('sequelize');
const {db} = require('../config/database');
const Content=require('./contentSchema');
const User=require('./userSchema');
const myVideo = db.define('tblMyvideo',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
myVideo.belongsTo(Content, {foreignKey: 'content_id'});
myVideo.belongsTo(User, {foreignKey: 'user_id'});

myVideo.sync({force: false}).then((res) => {
    console.log('myvideo Table Created Successfully');
}).catch((err) => {

    console.log('Error While Creating User Table');
})

module.exports = myVideo;