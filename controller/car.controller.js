const CarModel = require("../model/car.model");
const { acyncHandler } = require("../acyncHandler.js");
const { ObjectId } = require("mongoose").Types;

const CreateCar = acyncHandler(async (req, res) => {
  const { name, price, image, model, color, company, status, UserID,serviceHistory, } =
    req.body;
  const Car_Data = await CarModel.create({
    name,
    price,
    image,
    model,
    status,
    serviceHistory,
    color,
    company,
    status,
    UserID
  });
  if (status === "sold" && !Car_Data.owner) {
    res.status(400).send({
      success: false,
      message: "Sold cars must have an owner"
    });
  } else {
    res.status(201).send({
      success: true,
      message: "Car created successfully",
      Car_Data
    });
  }
  
  
});

const GetallCars = acyncHandler(async (req, res) => {
  const Cars_Data = await CarModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "UserID",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {}
    },
    {
      $sort: { _id: -1 }
    },
    {
      $limit: 10
    },
    {
      $count: "total"
    }
  ]);
  res.status(200).send({
    success: true,
    message: "All Cars",
    Cars_Data
  });
});

const GetsingleCar = acyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).send({
      success: false,
      message: "Please Enter Valid Id"
    });
  } else {
    const Car_Data = await CarModel.aggregate([
      {
        $match: { _id: new ObjectId(id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "UserID",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);
    if (!Car_Data) {
      res.status(404).send({
        success: false,
        message: "Car Not Found"
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Car Found",
        Car_Data
      });
    }
  }
});

const UpdateCar = acyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).send({
      success: false,
      message: "Please Enter Valid Id"
    });
  } else {
    const { name, price, image, model, color, company, status, UserID } =
      req.body;
    const Car_Data = await CarModel.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        price,
        image,
        model,
        color,
        company,
        status,
        UserID
      },
      { new: true }
    );
    if (!Car_Data) {
      res.status(404).send({
        success: false,
        message: "Car Not Found"
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Car Updated",
        Car_Data
      });
    }
  }
});

const DeleteCar = acyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).send({
      success: false,
      message: "Please Enter Valid Id"
    });
  } else {
    const Car_Data = await CarModel.findByIdAndDelete({
      _id: new ObjectId(id)
    });
    if (!Car_Data) {
      res.status(404).send({
        success: false,
        message: "Car Not Found"
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Car Deleted"
      });
    }
  }
});
module.exports = { CreateCar, GetallCars, GetsingleCar, UpdateCar, DeleteCar };
