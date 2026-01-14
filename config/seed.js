const bcrypt = require("bcryptjs");
const db = require("./db");

async function seed() {
  try {
    // ---------- ADMIN ----------
    const admin = await db.get(
      "SELECT id FROM users WHERE email = ?",
      ["admin@test.com"]
    );

    if (!admin) {
      const adminHash = bcrypt.hashSync("Password@123", 10);

      await db.run(
        `INSERT INTO users (name, email, password, address, role)
         VALUES (?, ?, ?, ?, ?)`,
        [
          "System Admin",
          "admin@test.com",
          adminHash,
          "Admin Address",
          "admin",
        ]
      );

      console.log("Admin user seeded");
    }

    // ---------- STORE OWNER ----------
    const owner = await db.get(
      "SELECT id FROM users WHERE email = ?",
      ["owner@test.com"]
    );

    if (!owner) {
      const ownerHash = bcrypt.hashSync("Password@123", 10);

      await db.run(
        `INSERT INTO users (name, email, password, address, role)
         VALUES (?, ?, ?, ?, ?)`,
        [
          "Store Owner",
          "owner@test.com",
          ownerHash,
          "Owner Address",
          "owner",
        ]
      );

      console.log("Store owner seeded");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}

module.exports = seed;
