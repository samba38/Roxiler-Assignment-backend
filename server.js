require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const db = require("./config/db");
const seed = require("./config/seed");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ---- CREATE TABLES ----
const schemaPath = path.join(__dirname, "database", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
  if (err) {
    console.error("Schema error:", err.message);
  } else {
    console.log("Tables created");
    seed(); // 🔥 THIS IS WHY LOGIN WILL WORK
  }
});

// ---- ROUTES ----
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
