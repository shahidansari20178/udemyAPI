const Course = require('../schema/courseSchema');

exports.post = (body,done) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    body.createdAt=dateTime;
    Course.findOne({where:{category_name: body.category_name}}).then((result) => {
        if(result) {
            done({message: 'Category Already Exist',status:1});
        } else {
            Course.create(body).then((newUser) => {
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
    Course.findAll({where:{
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

exports.getById = (id,body,done) => {
    //console.log('-------posTlogim========'+JSON.stringify(body));
    Course.findOne({where:{
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


exports.UpdateCategory = (id,body,done) => {
    //console.log('-------update========'+JSON.stringify(body.params));
    body.modifiedAt="2019-01-10 00:54:14";
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



}

exports.deleteCategory = (id,body,done) => {

    body.deletedAt=new Date().toDateString();
    body.isDeleted=true;
    console.log('---id--'+id);
    Course.findOne({where:{isDeleted: true,id:id}}).then((result) => {
        if(result) {
            done({message: 'Category already deleted'});
        } else {
            if(!body.deletedBy)
            {
                done({message: 'please pass deleter Id'});
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
