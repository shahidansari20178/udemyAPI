const Content = require('../schema/contentSchema');
let UPLOAD_PATH = 'media/video';
const {db} = require('../config/database');


exports.post = (body,done) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    body.createdAt=dateTime;
    console.log(JSON.stringify(body))
    console.log("path=>"+UPLOAD_PATH+'/'+body.file)
   // body.content_path= body.file && (UPLOAD_PATH+'/'+body.file.filename),
        //console.log(JSON.stringify(body))
    Content.findOne({where:{content_name: body.content_name}}).then((result) => {
        if(result) {
            done({message: 'Content Already Exist'});
        } else {
            Content.create(body).then((newUser) => {
                if(newUser) {
                    done(null,newUser);
                } else {
                    done({message: 'User Not Created'});
                }
            }).catch((err) => {
                done(err);
            });
        }
    }).catch((err)=>{
        done(err);
    })
}


exports.getContentByuserId = (id,body,done) => {
    //console.log('-------posTlogim========'+JSON.stringify(body));
    Content.findAll({where:{
            createdBy:id,isDeleted:false
        }}).then((result) => {

        if(result) {
            //console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}
exports.getAlldesc = (body,done) => {
    Content.findAll({where:{
            isDeleted:false
        },
        order:[['createdAt','DESC']]
    }).then((result) => {

        if(result) {
            // console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getAll = (body,done) => {
    Content.findAll({where:{
            isDeleted:false
        }}).then((result) => {

        if(result) {
            // console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}
exports.getCatBySearch = (body,done) => {
    console.log("-----search----"+body.search);
    db.query("SELECT * FROM `tblContents` WHERE `content_name` REGEXP '"+body.search+"'").spread((result) => {
        if(result) {
            // console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}


exports.getCatById = (id,body,done) => {
    //console.log('-------posTlogim========'+JSON.stringify(body));
    Content.findAll({where:{
            cat_id:id,isDeleted:false
        }}).then((result) => {

        if(result) {
            //console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}
exports.getById = (id,body,done) => {
    //console.log('-------posTlogim========'+JSON.stringify(body));
    Content.findOne({where:{
            id:id,isDeleted:false
        }}).then((result) => {

        if(result) {
            console.log('---result---'+result.tblUser);
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}


exports.UpdateContent = (id,body,done) => {
    //console.log('-------update========'+JSON.stringify(body.params));
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    body.modifiedAt=dateTime;
    //console.log('-------update========'+JSON.stringify(body));

    Content.findOne({where:{isDeleted: true,id:id}}).then((result) => {
        if(result) {
            done({message: 'Category deleted Cannat modified'});
        } else {
            if(!body.modifiedBy)
            {
                done({message: 'please pass modifier Id'});

            }
            else {
                Content.update(body, {where: {id: id}}).then((result) => {
                    if (result) {
                        // console.log('---result---'+result.tblUser);
                        done(null, result);
                    }
                    else {
                        done(err);
                    }
                }).catch((err) => {
                    done(err);
                });
            }
        }
    }).catch((err)=>{
        done(err);
    })



}

exports.deleteContent = (id,body,done) => {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    body.deletedAt=dateTime;
    body.isDeleted=true;
    console.log('---id--'+id);
    Content.findOne({where:{isDeleted: true,id:id}}).then((result) => {
        if(result) {
            done({message: 'Category already deleted'});
        } else {
            if(!body.deletedBy)
            {
                done({message: 'please pass deleter Id'});
            }
            else {
                Content.update(body, {where: {id: id}}).then((result) => {
                    if (result) {
                        // console.log('---result---'+result.tblUser);
                        done(null, result);
                    }
                    else {
                        done(err);
                    }
                }).catch((err) => {
                    done(err);
                });
        }
            }
    }).catch((err)=>{
        done(err);
    })

}

/*
exports.authEmail = (email,done) => {

    User.findOne({where:{email:email}}).then((result) => {

        if(result) {
            done(true);
        } else {
            done(false);
        }
    }).catch((err) => {

        if(err) {
            done(false);
        }
    })
}*/
