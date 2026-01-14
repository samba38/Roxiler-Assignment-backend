require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./config/db");
const seed = require("./config/seed");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * 1️⃣ Create tables FIRST
 */
const schemaPath = path.join(__dirname, "database", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, async (err) => {
  if (err) {
    console.error("Schema error:", err.message);
    process.exit(1);
  }

  console.log("✅ Tables created");

  /**
   * 2️⃣ Seed AFTER tables exist
   */
  await seed();
  console.log("✅ Seed completed");
});

/**
 * Routes
 */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

/**
 * Health check (VERY IMPORTANT for Render)
 */
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
