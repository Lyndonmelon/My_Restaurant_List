// require the essential packages
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const routes = require("./routes")
const methodOverride = require("method-override")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
require("./config/mongoose")


app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(routes)

// listen on port 3000
app.listen(port, () => {
    console.log("Running by node on port 3000")
})