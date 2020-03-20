const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, path.join("public", "images"));
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new ValidationError("Validation Error", ["Invalid Image type"]), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const uploadResponse = (req, res, next) => {
  return res.status(200).json({
    fileURI: "/images/" + req.file.filename
  });
};

//Setting up file upload parser
module.exports.upload = upload;
module.exports.uploadResponse = uploadResponse;
