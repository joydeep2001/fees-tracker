if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  console.log('NODE_ENV=',process.env.NODE_ENV);
}
//require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fees = require("./routes/fees");

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.static('client'));
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const connect = mongoose.connection;
connect.on("open", () => {
  console.log("conneted to Database");
});

let PORT = process.env.PORT || 3005;

app.use("/api/fees", fees);
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
