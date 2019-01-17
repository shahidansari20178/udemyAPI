const Sequelize = require('sequelize');
const {db} = require('../config/database');
const Course=require('./courseSchema');
const User=require('./userSchema');
const Content = db.define('tblContent',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content_description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    content_path: {
    type: Sequelize.STRING,
        allowNull: false
},
    content_type: {
    type: Sequelize.STRING,
        allowNull: false
},
    cat_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
    ,
    deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    modifiedBy: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    modifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
});
Content.belongsTo(Course, {foreignKey: 'cat_id'});
 Content.belongsTo(User, {foreignKey: 'createdBy'});
 Content.belongsTo(User, {foreignKey: 'modifiedBy'});
 Content.belongsTo(User, {foreignKey: 'deletedBy'});
Content.sync({force: false}).then((res) => {
    console.log('Content Table Created Successfully');
}).catch((err) => {

    console.log('Error While Creating User Table');
})

module.exports = Content;