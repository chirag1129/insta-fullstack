const express = require('express');
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 1129;
const {
  MONGOURI
} = require('./config/mongodb');
require("./models/user");
require("./models/post");
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("insta-clone/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "insta-clone", "build", "index.html"));
  });
}
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log('connected to DB');
});
mongoose.connection.on("error", err => {
  console.log('error to connected to DB', err);
});
app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
