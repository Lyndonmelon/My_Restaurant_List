const express = require("express")
const { model } = require("mongoose")
const router = express.Router()
const restaurant = require("../../models/restaurant")

router.get("/:id", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
            .lean()
            .then(rest => res.render("show", {restaurant: rest}))
            .catch(error => console.log(error))
})


// create new restaurant 
router.post("/", (req, res) => {
    const restaurant_new = req.body
    return restaurant.create(restaurant_new)
            .then(res.redirect("/"))
            .catch(error => console.log(error))
})

// edit restaurant
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
        .lean()
        .then(rest => res.render("edit", {restaurant: rest}))
        .catch(error => console.log(error))
})

router.put("/:id/edit", (req, res) => {
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
router.delete("/:id/delete", (req, res) => {
    const id = req.params.id
    return restaurant.findById(id)
            .then(rest => rest.remove())
            .then(res.redirect("/"))
            .catch(error => console.log(error))
})


module.exports = router