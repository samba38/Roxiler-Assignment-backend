const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// IMPORTANT: absolute path
const dbPath = path.join(process.cwd(), "database", "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to SQLite DB:", dbPath);
  }
});

module.exports = db;

