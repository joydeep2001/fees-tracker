const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype);
    const folderPath = __dirname;
    console.log(folderPath);
    cb(null, folderPath + "/tmp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.body.studentName}_sem${req.body.sem}_${req.body.feesMonth}`
    );
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
