const myVideo = require('../schema/myvideoSchema');
const {db} = require('../config/database');
exports.post = (body,done) => {
    /*var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    body.createdAt=dateTime;*/
    db.query("SELECT * FROM `tblMyvideos` WHERE `content_id` = "+body.content_id+" AND `user_id` = "+body.user_id+" AND isDeleted=false").spread((result) => {
        console.log(JSON.stringify(result))
        if(result.length > 0) {
            done({message: 'Content Already Bought',status:1});
        } else {
            myVideo.create(body).then((newUser) => {
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

exports.getAll = (body,done) => {
    console.log('-------posTlogim========'+JSON.stringify(body));
    myVideo.findAll({where:{isDeleted:false}}).then((result) => {

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

exports.getById = (id,body,done) => {
    //console.log('-------posTlogim========'+JSON.stringify(body));
    db.query("SELECT c.* FROM tblContents as c  where id in (SELECT content_id FROM `tblMyvideos` WHERE isDeleted=false and `user_id` ="+id+")").spread((result) => {

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


/*exports.UpdateCategory = (id,body,done) => {
    //console.log('-------update========'+JSON.stringify(body.params));
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    body.modifiedAt=dateTime;
    //console.log('-------update========'+JSON.stringify(body));

    Course.findOne({where:{isDeleted: true,id:id}}).then((result) => {
        if(result) {
            done({message: 'Category deleted Cannat modified'});
        } else {
            if(!body.modifiedBy)
            {
                done({message: 'please pass modifier Id'});

            }
            else {
                Course.update(body, {where: {id: id}}).then((result) => {
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



}*/

exports.deleteVideo = (id,body,done) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(id+'---userid--'+body.user_id);
    /*myVideo.findOne({where:{isDeleted: true,id:id}}).then((result) => {
        if(result) {
            done({message: 'Category already deleted'});
        } else {*/

            db.query("update tblMyvideos set isDeleted=true,deletedAt='"+dateTime+"' where content_id="+id+" and user_id="+body.user_id+"").spread((result) => {
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
       /* }
    }).catch((err)=>{
        done(err);
    })*/
    console.log('-------delete========'+JSON.stringify(body));

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
