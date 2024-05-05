const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const todoRoutes = require("./routes/todoRouter.js");

dotEnv.config();
//connect database mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());

// routes
app.use("/todo", todoRoutes);

const port = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
