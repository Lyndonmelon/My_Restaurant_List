// require the essential packages
const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
const restaurant_list = require("./restaurant.json")


app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))

// index page routing
app.get("/", (req, res) =>{
    res.render("index", {restaurants: restaurant_list.results})
})

// restaurant page routing
app.get("/restaurants/:restaurant_id", (req, res) => {
    let id = req.params.restaurant_id
    const restaurant = restaurant_list.results.find(rest => rest.id.toString() === id)
    res.render("show", {restaurant: restaurant})
})

// restaurant search routing
app.get("/search", (req, res) => {
    const keyword = req.query.keyword
    const filtered_restaurant = restaurant_list.results.filter(rest => rest.name.includes(keyword) || rest.category.includes(keyword))
    res.render("index", {restaurants: filtered_restaurant, keyword: keyword})
})


// listen on port 3000
app.listen(port, () => {
    console.log("Running by node on port 3000")
})