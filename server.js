require("dotenv").config();
const express = require("express");
const cors = require("cors");

const seed = require("./config/seed");

const app = express();

app.use(cors());
app.use(express.json());

// 👉 seed admin & owner ON EVERY START (safe)
seed();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
