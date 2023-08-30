const router = require("express").Router()
const multer = require('multer');
const { UploadFile, UploalPopUp } = require("../controller/UserController");
var path = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public')
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
})

var uploads = multer({ storage: storage })

router.post('/uploadfile',uploads.array("myFile",2),UploadFile)

router.post('/uploadPopUp',uploads.array("myFile",1),UploalPopUp)

module.exports={router}