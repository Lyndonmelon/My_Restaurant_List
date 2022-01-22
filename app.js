// require the essential packages
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
const restaurant = require("./models/restaurant")

app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

// conncect to DB
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log("DB connection fail.")
})

db.once('open', () => {
    console.log("DB connected.")
})

// index page routing
app.get("/", (req, res) =>{
    // res.render("index", {restaurants: restaurant_list.results})
    restaurant.find()
        .lean()
        .then(restaurants => {
            res.render("index", {restaurants})
        })
        .catch(error => console.log(error))
})

app.get("/restaurant/:id", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
            .lean()
            .then(rest => res.render("show", {restaurant: rest}))
            .catch(error => console.log(error))
})

// restaurant search routing
app.get("/search", (req, res) => {
    const keyword = req.query.keyword
    restaurant.find()
    .lean()
    .then(restaurants => {
        // res.render("index", {restaurants})
        const filtered_restaurant = restaurants.filter(rest => rest.name.includes(keyword) || rest.category.includes(keyword))
        res.render("index", {restaurants: filtered_restaurant, keyword: keyword})
    })
    .catch(error => console.log(error))
})

// create new restaurant
app.get("/new", (req, res) => {
    res.render("new")
})

// create new restaurant 
app.post("/restaurant/new", (req, res) => {
    const restaurant_new = req.body
    return restaurant.create(restaurant_new)
            .then(res.redirect("/"))
            .catch(error => console.log(error))
})

// edit restaurant
app.get("/restaurant/:id/edit", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
        .lean()
        .then(rest => res.render("edit", {restaurant: rest}))
        .catch(error => console.log(error))
})

app.post("/restaurant/:id/edit", (req, res) => {
    const id = req.params.id
    const new_restaurant_info = req.body
    // console.log(new_restaurant_info)
    return restaurant.findById(id)
        .then(rest => {
            for (let key in new_restaurant_info){
                rest[key] = new_restaurant_info[key]
            }
            rest.save()
        })
        .then(() => res.redirect("/"))
        .catch(error => console.log(error))
})

// delete restaurant
app.post("/restaurant/:id/delete", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
            .then(rest => rest.remove())
            .then(res.redirect("/"))
            .catch(error => console.log(error))
})


// listen on port 3000
app.listen(port, () => {
    console.log("Running by node on port 3000")
})