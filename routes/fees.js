const router = require("express").Router();
const fee = require("../models/fees");
const upload = require("../multerUpload");
const fileUpload = require("../googleDrive");

router.get("/", async (req, res) => {
  try {
    const fees = await fee.find({});
    res.status(200).json({
      fees: fees,
      error: false,
      messsage: "successful",
      count: fees.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "please try again!" });
  }
});

router.post("/upload", upload.single("screenshot"), async (req, res) => {
  console.log(req.body);
  const ssURL = await fileUpload(`${req.body.name}_sem${req.body.sem}_${req.body.feesMonth}`);
  try {
    const payload = new fee({
      name: req.body.name,
      mobile: req.body.mobile,
      gurdianMobile: req.body.gurdianMobile,
      college: req.body.college,
      sem: req.body.sem,
      feesMonth: req.body.feesMonth,
      screenshotURL: ssURL,
      timestamp: new Date(),
      paymentMode: req.body.paymentMode,
    });
    const uploadedData = await payload.save();
   
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid data" });
  }
});

module.exports = router;
