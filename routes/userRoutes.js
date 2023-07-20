const express = require("express");
const router = express.Router();
const UserData = require("../models/userModel");
var nodemailer = require("nodemailer");

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();

const userAddedDate = [currentDay, currentMonth, currentYear].join("/");
const dateToSentOnEmail = [
  currentDay,
  date.toLocaleString("default", { month: "long" }),
  currentYear,
].join("-");

console.log(dateToSentOnEmail);

router.post("/save_data", async (req, res) => {
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
  // For Office365
  var transporter = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp.office365.com",
    port: 587,
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "testuser@uvxcel.com",
      pass: "ssvrfsskdzzwssfy",
    },
  });

  var mailOptions = {
    from: "testuser@uvxcel.com",
    to: ["chanchalkumarg@uvxcel.com", "marketing@uvxcel.com"],
    subject: "Enquiry From uvXcel Website",
    html: `<b>Topic: </b>${topic}<br><br> <b>Message: </b>${helptext}<br><br><b>Contact Number: </b>${mobile}<br><br><b>Email: </b>${email}<br><br><b>Enquiry Date: </b>${dateToSentOnEmail}`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent");
    }
  });

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
