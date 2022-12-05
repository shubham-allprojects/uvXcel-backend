// const express = require("express");
// const router = express.Router();
// const subscriberEmail = require("../models/subscriberEmails");

// router.post("/save_email", (req, res) => {
//   const { email } = req.body;
//   const newSubsriber = new subscriberEmail({
//     email,
//   });
//   newSubsriber.save();
//   res.send({ newSubsriber });
// });

// router.get("/get-subscribers", async (req, res) => {
//   const allSubsribers = await subscriberEmail.find();
//   res.send(allSubsribers);
// });

// router.get("/get-current-subscriber/:id", async (req, res) => {
//   await subscriberEmail
//     .findOne({ _id: req.params.id })
//     .then((subscriber) => res.json(subscriber));
// });

// router.delete("/delete-subscriber/:id", async (req, res) => {
//   await subscriberEmail.findByIdAndDelete(req.params.id);
//   res.send("Subscriber deleted");
// });

// module.exports = router;
