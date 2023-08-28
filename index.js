const express = require("express")
const cors = require("cors")
const AuthRoutes = require("./routes/Auth")
const { dbConnection } = require("./database/db")
require('dotenv').config()

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(cors())

dbConnection()

app.use("/api/auth",AuthRoutes.router)

var port_number = app.listen(process.env.PORT || 5000);

app.listen(port_number);
