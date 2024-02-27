const express = require("express");
const router = express.Router();

const { CreateCar, GetallCars, GetsingleCar, UpdateCar, DeleteCar } = require("../controller/car.controller");

router.post("/car", CreateCar);
router.get("/car", GetallCars);
router.get("/car/:id", GetsingleCar);
router.put("/car/:id", UpdateCar);
router.delete("/car/:id", DeleteCar);

module.exports = router 