const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.AZURE_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Azure cosmos db"))
  .catch(console.error);

// app.use("/", require("./routes/jobRoutes"));
app.use("/", require("./routes/userRoutes"));
// app.use("/", require("./routes/resourceRoutes"));

const PORT = process.env.PORT || 10255;

app.listen(PORT, function () {
  console.log(`server running on port ${PORT}`);
});
