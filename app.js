if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  console.log("NODE_ENV=", process.env.NODE_ENV);
}
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fees = require("./routes/fees");

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.static("client"));
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'client')});
})
try {
  mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
  const connect = mongoose.connection;
  connect.on("open", () => {
    console.log("conneted to Database");
  });
} catch (e) {
  console.log("Mongodb error: ", e);
}

let PORT = process.env.PORT || 3005;

app.use("/api/fees", fees);
app.post("/api/test/:resType", (req, res) => {
  console.log(req.params);
  if (req.params.resType === "success")
    return res.status(200).json({ msg: "success" });
  if (req.params.resType === "fail")
    return res.status(400).json({ msg: "fail" });
  return res.status(500).json({ msg: "server error" });
});
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
