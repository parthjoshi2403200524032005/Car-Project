const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config({ path: "./.env" });
const route = require("./routes/routes.js");

app.use(express.json());

mongoose
  .connect(`${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
app.use("/api", route);


app.listen(process.env.PORT || 6000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
  