const {Router} = require ('express');
const router = Router();
const bcrypt = require('bcryptjs');
const upload = require('../config/multer');
let UPLOAD_PATH = 'media/video';
const {post,getAll,UpdateContent,getById,deleteContent,getAlldesc,getCatById} = require ('../controller/contentController');
//const {getAll} = require('../controller/commoncontroller');
//const routeName = "user";
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
var secretKey = 'STkey'

router.post('/',upload(UPLOAD_PATH).single('image'),(req,res) => {
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

/*
router.get('/desc',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    console.log('---desc----'+JSON.stringify(req.body));

});
*/

router.get('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    console.log('---desc11----'+JSON.stringify(req.body));
    if(req.params.id=='desc')
    {
        getAlldesc( req.body,(err,result) => {
            if(err) {
                res.statusCode = 400;
                res.json(err);
            } else {
                res.statusCode = 201;
                console.log('----result00---'+JSON.stringify(result));
                res.json(result);
            }
        })
    }
    else
    {
        getById(req.params.id,req.body,(err,result) => {
            if(err) {
                res.statusCode = 400;
                res.json(err);
            } else {
                res.statusCode = 201;
                res.json(result);
            }
        })
    }

});
router.get('/cat/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    console.log('---desc11----'+JSON.stringify(req.body));

        getCatById(req.params.id, req.body,(err,result) => {
            if(err) {
                res.statusCode = 400;
                res.json(err);
            } else {
                res.statusCode = 201;
                console.log('----result00---'+JSON.stringify(result));
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


router.put('/:id',(req,res) => {
    //var hash = bcrypt.hashSync(req.body.password, salt);
    //req.body.password = hash;
    console.log("----"+req.params.id)
    const id = req.params.id;
    UpdateContent( id,req.body,(err,result) => {
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
    deleteContent( id,req.body,(err,result) => {
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
router.get('/',(req,res) => {
    getAll(routeName, (err,result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 200;
            res.json(result);
        }
    });
});
*/


module.exports = router;

