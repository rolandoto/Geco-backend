const router = require("express").Router()
const multer = require('multer');
const { UploadFile, UploalPopUp, UploadCartPresent } = require("../controller/UserController");
var path = require("path");
const { ValidarCampos } = require("../mideleware/middeleweres");
const { check } = require("express-validator");

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

router.post('/uploadCartPresent',[
  check("Username","es obligatorio").not().isEmpty(),
  check("ID_Reserva","es obligatorio").not().isEmpty(),
  ValidarCampos
],UploadCartPresent)

module.exports={router}