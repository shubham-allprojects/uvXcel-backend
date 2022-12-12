const express = require("express");
const router = express.Router();
const UserData = require("../models/userModel");

const currentYear = new Date().getFullYear();

const currentMonth = new Date().getMonth() + 1;

const currentDay = new Date().getDate();

const userAddedDate = [currentDay, currentMonth, currentYear ].join("/");

router.post("/save_data", (req, res) => {
  const { name, email, mobile, topic, helptext } = req.body;
  const newUser = new UserData({
    name,
    email,
    mobile,
    topic,
    helptext,
    dateAdded: userAddedDate,
  });
  newUser.save();
  res.send({ newUser });
});

router.get("/get-users", async (req, res) => {
  const allUsers = await UserData.find();
  res.send(allUsers.reverse());
});

router.get("/get-current-user/:id", async (req, res) => {
  await UserData.findOne({ _id: req.params.id }).then((user) => res.json(user));
});

router.delete("/delete-user/:id", async (req, res) => {
  await UserData.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

module.exports = router;
