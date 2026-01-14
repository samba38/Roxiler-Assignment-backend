const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// IMPORTANT: absolute path for Render
const dbPath = path.join(__dirname, "..", "database", "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("Connected to SQLite DB:", dbPath);
  }
});

module.exports = db;
