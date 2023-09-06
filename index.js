const express = require("express")
const cors = require("cors")
const AuthRoutes = require("./routes/Auth")
const { dbConnection } = require("./database/db")
require('dotenv').config()
var path = require("path")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(cors())

dbConnection()


app.use("/api/resecion",AuthRoutes.router)
app.use('/public', express.static(path.join(__dirname, 'public')));

var port_number = app.listen(process.env.PORT || 5000);

app.listen(port_number);
