const express = require("express")
const router = express.Router()
const restaurant = require("../../models/restaurant")

router.get("/", (req, res) => {
    restaurant.find()
        .lean()
        .then(restaurants => res.render("index", {restaurants}))
        .catch(error => console.log(error))
})

router.get("/new", (req, res) => {
    res.render("new")
})

router.get("/search", (req, res) => {
    const keyword = req.query.keyword
    const sort = req.query.sort
    let sort_rule
    switch (sort) {
        case "A > Z":
            sort_rule = {name_en: "asc"}
        case "Z > A":
            sort_rule = {name_en: "desc"}
        case "類別":
            sort_rule = {category: "asc"}
        case "地區":
            sort_rule = {location: "asc"}
    }
    
    restaurant.find()
    .lean()
    .sort(sort_rule)
    .then(restaurants => {
        // res.render("index", {restaurants})
        const filtered_restaurant = restaurants.filter(rest => rest.name.includes(keyword) || rest.category.includes(keyword))
        res.render("index", {restaurants: filtered_restaurant, keyword: keyword})
    })
    .catch(error => console.log(error))
})

module.exports = router