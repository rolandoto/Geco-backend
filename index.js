const express = require("express")
const cors = require("cors")
const AuthRoutes = require("./routes/Auth")
const { dbConnection } = require("./database/db")
require('dotenv').config()

const app = express()

let port = process.env.PORT || 8080;

app.use(express.static("public"))
app.use(express.json())
app.use(cors())

dbConnection()

app.use("/api/auth",AuthRoutes.router)

app.listen(port,(e) =>{
    console.log(`puesto correct ${e}`)
})