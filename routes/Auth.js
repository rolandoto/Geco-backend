const { userProduct, userProvedor, inserProvedor, inserProduct, getProvedor, getProductos } = require("../controller/UserController")

const router = require("express").Router()

router.get("/listmotel/:id",userProduct)

router.get("/listprovesor/:id",userProvedor)

router.post("/insertprovedores",inserProvedor)

router.post("/insertproduct",inserProduct)

router.get("/getprovedor",getProvedor)

router.get("/reservas",getProductos)

module.exports={router}