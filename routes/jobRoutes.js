const express = require("express");
const router = express.Router();
const allJobs = require("../models/jobModel");

const currentYear = new Date().getFullYear();

const currentMonth = new Date().getMonth() + 1;

const currentDay = new Date().getDate();

const together = [currentYear, currentMonth, currentDay ].join("/");

// Route-1 add job details
router.post("/add-job", async (req, res) => {
  const {
    designation,
    experience,
    skills,
    salary,
    desc,
    location,
    status,
    type,
    shifts,
    positions,
    eligibility,
  } = req.body;
  const newJob = await new allJobs({
    designation,
    experience,
    skills,
    salary,
    desc,
    location,
    status,
    type,
    shifts,
    positions,
    eligibility,
    dateAdded: together,
  });
  newJob.save();
  res.send({ newJob });
});

// Route-2 get all jobs details
router.get("/get-jobs", async (req, res) => {
  const { page = 1, limit = 1000, location, search, status } = req.query;

  // location & designation & status
  if (location && search && status) {
    const alljobs = await allJobs
      .find({
        $and: [
          { location: { $regex: location, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { status: status },
        ],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // location & designation
  else if (location && search) {
    const alljobs = await allJobs
      .find({
        $and: [
          { location: { $regex: location, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
        ],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // location & status
  else if (location && status) {
    const alljobs = await allJobs
      .find({
        $and: [
          { location: { $regex: location, $options: "i" } },
          { status: status },
        ],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // designation & status
  else if (search && status) {
    const alljobs = await allJobs
      .find({
        $and: [
          { status: status },
          { designation: { $regex: search, $options: "i" } },
        ],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // location
  else if (location) {
    const alljobs = await allJobs
      .find({
        location: { $regex: location, $options: "i" },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // designation
  else if (search) {
    const alljobs = await allJobs
      .find({
        designation: { $regex: search, $options: "i" },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  // Status
  else if (status) {
    const alljobs = await allJobs
      .find({
        status: status,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
  //all
  else if (!location && !search && !status) {
    const alljobs = await allJobs
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  } else {
    const alljobs = await allJobs
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(alljobs);
  }
});

// Route-2 get all jobs details
// router.get("/get-jobs", async (req, res) => {
//   const { page = 1, limit = 1000, location, search } = req.query;
//   if (location && location !== "all" && search && search !== "all") {
//     const alljobs = await allJobs
//       .find({
//         $and: [
//           { location: { $regex: location, $options: "i" } },
//           { designation: { $regex: search, $options: "i" } },
//         ],
//       })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);
//     res.send(alljobs);
//   } else if (location && location !== "all") {
//     const alljobs = await allJobs
//       .find({
//         location: { $regex: location, $options: "i" },
//       })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);
//     res.send(alljobs);
//   } else if (search && search !== "all") {
//     const alljobs = await allJobs
//       .find({
//         designation: { $regex: search, $options: "i" },
//       })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);
//     res.send(alljobs);
//   } else {
//     const alljobs = await allJobs
//       .find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit);
//     res.send(alljobs);
//   }
// });

// Route-3 get current job details
router.get("/get-current-job/:id", async (req, res) => {
  await allJobs.findOne({ _id: req.params.id }).then((job) => res.json(job));
});

// Route-4 edit current job details
router.put("/edit-job/:id", async (req, res) => {
  await allJobs.findByIdAndUpdate(req.params.id, req.body);
  res.send(req.body);
});

// Route-5 delete selected job
router.delete("/delete-job/:id", async (req, res) => {
  await allJobs.findByIdAndDelete(req.params.id);
  res.send("Job deleted");
});

module.exports = router;
