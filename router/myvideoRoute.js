const {Router} = require ('express');
const router = Router();
const bcrypt = require('bcryptjs');
const {postlogin,post,getAll,UpdateCategory,getById,deleteCategory,deleteVideo} = require ('../controller/myvideoController');
//const {getAll} = require('../controller/commoncontroller');
//const routeName = "user";
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
var secretKey = 'STkey'
router.post('/',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    post( req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});

router.delete('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    console.log("----"+req.params.id)
    const id = req.params.id;
    deleteVideo( id,req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});

router.get('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);

    getById(req.params.id,req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});
router.get('/',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    getAll( req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});
/*

router.put('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    console.log("----"+req.params.id)
    const id = req.params.id;
    UpdateCategory( id,req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});
router.delete('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    console.log("----"+req.params.id)
    const id = req.params.id;
    deleteCategory( id,req.body,(err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 201;
            res.json(result);
        }
    })
});
*/

module.exports = router;
