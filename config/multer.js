var multer = require('multer');
let UPLOAD_PATH = 'public';
var filepath='';
const storage = storageDest =>multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, storageDest)
    },
    filename: function (req, file, cb) {
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        filepath="public/"+Date.now()+ '.' +extension;
        console.log(filepath);
        console.log(file);

        cb(null,Date.now()+ '.' +extension)
    }
});

const upload = storageDest=>multer({ storage: storage(storageDest) });
console.log(upload)
console.log(filepath)
module.exports = upload,filepath