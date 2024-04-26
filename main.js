const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
dotEnv.config();
//connect database mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!"));

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
