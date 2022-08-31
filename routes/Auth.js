const { userProduct, userProvedor, inserProvedor, inserProduct, userRegister, userLogin, getProvedor, getProductos } = require("../controller/UserController")

const router = require("express").Router()

router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/listmotel/:id",userProduct)

router.get("/listprovesor/:id",userProvedor)

router.post("/insertprovedores",inserProvedor)

router.post("/insertproduct",inserProduct)

router.get("/getprovedor",getProvedor)

router.get("/getproductos",getProductos)

module.exports={router}