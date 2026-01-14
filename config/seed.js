const bcrypt = require("bcryptjs");
const db = require("./db"); // ✅ FIXED PATH

async function seed() {
  try {
    const admin = await db.get(
      "SELECT id FROM users WHERE email = ?",
      ["admin@test.com"]
    );

    if (!admin) {
      const hash = bcrypt.hashSync("Password@123", 10);
      await db.run(
        `INSERT INTO users (name,email,password,address,role)
         VALUES (?,?,?,?,?)`,
        ["System Admin", "admin@test.com", hash, "Admin Address", "admin"]
      );
      console.log("Admin seeded");
    }

    const owner = await db.get(
      "SELECT id FROM users WHERE email = ?",
      ["owner@test.com"]
    );

    if (!owner) {
      const hash = bcrypt.hashSync("Password@123", 10);
      await db.run(
        `INSERT INTO users (name,email,password,address,role)
         VALUES (?,?,?,?,?)`,
        ["Store Owner", "owner@test.com", hash, "Owner Address", "owner"]
      );
      console.log("Owner seeded");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}

module.exports = seed;
