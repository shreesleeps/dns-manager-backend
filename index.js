const express = require("express");
const app = express();
const cors = require("cors");
const { router } = require("./routers/router");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("aws-dns-manager-backend");
  console.log("service triggered");
});

app.use("/api", router);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
