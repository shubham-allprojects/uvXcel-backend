// const express = require("express");
// const router = express.Router();
// const Resource = require("../models/resourceModel");
// const multerUpload = require("../middleware/multerUpload");
// const event = require("events");

// router.post(
//   "/resource/create",
//   multerUpload.single("doc"),
//   async (req, res) => {
//     const { name, howSee, link, type } = req.body;
//     // console.log(name, howSee, link, type);
//     const data = {
//       doc: {},
//     };
//     if (!name || !howSee || !type) {
//       res.status(400).json("Please fill all the field");
//     } else if (type != "link" && !req.file) {
//       res.status(400).json("Please select the file first");
//     } else {
//       if (req.file) {
//         data.doc.filename = req.file.filename;
//         data.doc.mimetype = req.file.mimetype;
//       } else {
//         data.link = link;
//       }
//       const validPeople = howSee.split(",");
//       data.name = name;
//       data.howSee = validPeople;
//       data.type = type;

//       await Resource.create(data);
//       res.status(200).json("Resource created successfully");
//     }
//   }
// );

// router.get("/resource/data/:type", async (req, res, next) => {
//   try {
//     const type = req.params.type;
//     // console.log(type);
//     const resource = await Resource.find({ type });
//     res.status(200).json(resource);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// // const eventEmit = new event.EventEmitter();
// // const deleteData = async () => {
// //   try {
// //     const resource = await Resource.remove({ type: "holiday" });
// //     console.log(resource);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // eventEmit.addListener("delete", deleteData);

// // setTimeout(() => eventEmit.emit("delete"), 2000);

// module.exports = router;
