const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../src/doc"));
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var multerUpload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = multerUpload;
