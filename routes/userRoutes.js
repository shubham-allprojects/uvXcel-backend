const express = require("express");
const router = express.Router();
const UserData = require("../models/userModel");
// var nodemailer = require("nodemailer");

const currentYear = new Date().getFullYear();

const currentMonth = new Date().getMonth() + 1;

const currentDay = new Date().getDate();

const userAddedDate = [currentDay, currentMonth, currentYear].join("/");

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

  // var transporter = nodemailer.createTransport({
  //   service: "hotmail",
  //   host: "smtp.office365.com",
  //   port: 465,
  //   secureConnection: true,
  //   tls: { ciphers: "SSLv3" },
  //   auth: {
  //     user: "shubhamp@uvxcel.com", // generated ethereal user
  //     pass: "", // generated ethereal password
  //   },
  // });

  // var mailOptions = {
  //   from: "shubhamp@uvxcel.com",
  //   to: "parab16aug@gmail.com",
  //   subject: "Enquiry From uvXcel Website",
  //   html: `<b>From: </b>${email} <br> <b>Topic: </b>${topic}<br> <b>Message: </b>${helptext} <br> <b>Contact Number: </b>${mobile}<br> <b>Enquiry Date: </b>${userAddedDate}`,
  // };

  // transporter.sendMail(mailOptions, function (error) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent");
  //   }
  // });

  res.send({ newUser });
});

router.get("/get-users", async (res) => {
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
