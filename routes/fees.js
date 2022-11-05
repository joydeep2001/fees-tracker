const router = require("express").Router();
const fee = require("../models/fees");
const upload = require("../multerUpload");
const fileUpload = require("../googleDriveV3");

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
router.post("/updateVerificationStatus", async (req, res) => {
  try {
    console.log(req.body);
    const verificationStatus = req.body.verificationStatus;
    const paymentId = req.body.paymentId;

    const updatedDoc = await fee.updateOne(
      { _id: paymentId },
      { $set: { verificationStatus: verificationStatus } }
    );
    console.log(updatedDoc);
    res.status(200).json({ id: paymentId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error!" });
  }
});
router.post("/upload", upload.single("screenshot"), async (req, res) => {
  console.log(req.body);

  try {
    const ssURL = await fileUpload(
      `${req.body.studentName}_sem${req.body.sem}_${req.body.feesMonth}`
    );
    const payload = new fee({
      name: req.body.studentName,
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
