const User = require('../schema/userSchema');

exports.post = (body,done) => {
    User.findOne({where:{user_email: body.user_email}}).then((result) => {
        if(result) {
            done({message: 'Email Id Already Exist'});
        } else {
            User.create(body).then((newUser) => {
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
    User.findAll({}).then((result) => {

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

exports.getById = (id,body,done) => {
    console.log('-------ID========'+id);
    User.findOne({where:{
            id:id
        }}).then((result) => {

        if(result) {
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}
exports.UpdateUser = (id,body,done) => {
    console.log('-------update========'+JSON.stringify(body.params));

    User.update({body},{where:{id:id}}).then((result) => {
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


exports.postlogin = (body,done) => {
    console.log('-------posTlogim========'+body.user_email);

    if(!body.user_email || !body.user_password || !body.user_role)
    {
        done({message: 'please provide proper value'});
    }
    User.findOne({where: {user_email: body.user_email,user_password: body.user_password,user_role:body.user_role}}).then((result) => {
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

exports.authEmail = (email,done) => {

    User.findOne({where:{user_email:email}}).then((result) => {

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
}