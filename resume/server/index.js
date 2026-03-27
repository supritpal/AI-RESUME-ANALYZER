let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let uri = process.env.MONGO_URI;
let userRoutes = require("./routes/userRoutes");
let resumeroute = require("./routes/resumeRoute");
let analyzeRoute = require("./routes/analyzeRoute");

mongoose
  .connect(uri)
  .then(() => console.log("database has been successfully connected"))
  .catch((err) => console.log(err));

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/resume", resumeroute);
app.use("/analyze", analyzeRoute);
app.get("/", (req, res) => {
  res.send("API is working Great");
});

app.listen(PORT, () => {
  console.log(`the project is running on the port ${PORT}`);
});
