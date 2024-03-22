const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env['AZURE_URI'], {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Azure cosmos db"))
  .catch(console.error);

app.use("/", require("./routes/userRoutes"));

const PORT = 10255;

app.listen(PORT, function () {
  console.log(`server running on port ${PORT}`);
});
