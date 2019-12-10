const express = require("express")
const routes = require("./routes")

const app = express()

app.set("view engine", "ejs")

app.use(express.json()) // for parsing application/json

app.use(express.static(__dirname + "/public"))

app.use("/", routes)

module.exports = app
