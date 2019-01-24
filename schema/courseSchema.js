const Sequelize = require('sequelize');
const {db} = require('../config/database');
const User=require('./userSchema');
const Course = db.define('tblCourse',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
        category_description: {
        type: Sequelize.STRING,
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
//
Course.belongsTo(User, {foreignKey: 'createdBy'});
Course.belongsTo(User, {foreignKey: 'modifiedBy'});
Course.belongsTo(User, {foreignKey: 'deletedBy'});



Course.sync({force: false}).then((res) => {
    console.log('Course Table Created Successfully');
}).catch((err) => {

    console.log('Error While Creating User Table');
})

module.exports = Course;


/*
Product.belongsTo(Category, {foreignKey: 'cid'});
Product.belongsTo(Sub_Category, {foreignKey: 'scid'});
const Category = require('../schema/categoriesSchema');
const Sub_Category = require('../schema/sub_categoriesSchema');*/
