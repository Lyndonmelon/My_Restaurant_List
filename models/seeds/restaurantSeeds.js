const mongoose = require("mongoose")
const restaurant = require("../restaurant")
const restaurantListFile = require("../../restaurant.json")

mongoose.connect("mongodb://localhost/restaurant")
const db = mongoose.connection

db.on('error', () => {
    console.log("DB Error")
})

db.once("open", () => {
    console.log("DB connected.")
    const list = restaurantListFile.results
    list.forEach(rest => {
        restaurant.create(
            {
                name: rest.name,
                name_en: rest.name_en,
                category: rest.category,
                image: rest.image,
                location: rest.location,
                phone: rest.phone,
                google_map: rest.google_map,
                rating: rest.rating,
                description: rest.description 
            })
        console.log("seed generated")
        return
    })
})