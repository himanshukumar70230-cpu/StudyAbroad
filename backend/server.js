require("dotenv").config();

const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");

const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB().then(() => {
  createDefaultAdmin();
});


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Study Abroad API is running");
 
});

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(process.env.MONGO_URL)
