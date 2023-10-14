const express = require("express");
const fs = require("fs");
const {
  connectDatabase
} = require("./utils/dblink");
require("dotenv").config();

connectDatabase();

const app = express();
const controller = require("./controller");
// const https = require("https");
// const server = https.createServer(
//   {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   },
//   app);
const http = require("http");
const cors = require("cors");
app.use(express.json({limit: '50mb'}));
app.use(cors());
const server = http.createServer(
  // {
  //   key: fs.readFileSync("key.pem"),
  //   cert: fs.readFileSync("cert.pem"),
  // },
  app);

app.get("/mint/:mint", controller.findByMint)
app.get("/status/:status", controller.findByMint)
app.get("/owner/:owner", controller.findByMint)

app.post("/insert", controller.insertData);
app.get("/getOrInsertData/:mint", controller.getOrInsertData)
app.post("/getorinsertnft", controller.getOrInsertNftData)


app.put("/update", controller.updateData);

var port_number = server.listen(process.env.PORT || 4000);
app.listen(port_number);

// server.listen(4000, () => {
//   console.log("listening on *:4000");
// });
