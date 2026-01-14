require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB
const schema = fs.readFileSync("./database/schema.sql", "utf8");
db.exec(schema);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
