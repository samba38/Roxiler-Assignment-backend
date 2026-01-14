const bcrypt = require("bcryptjs");
const db = require("./db");

function seed() {
  // ADMIN
  db.get(
    "SELECT id FROM users WHERE email = ?",
    ["admin@test.com"],
    (err, row) => {
      if (!row) {
        const hash = bcrypt.hashSync("Password@123", 10);
        db.run(
          `INSERT INTO users (name, email, password, address, role)
           VALUES (?, ?, ?, ?, ?)`,
          [
            "System Admin",
            "admin@test.com",
            hash,
            "Admin Address",
            "admin",
          ],
          () => console.log("Admin seeded")
        );
      }
    }
  );

  // OWNER
  db.get(
    "SELECT id FROM users WHERE email = ?",
    ["owner@test.com"],
    (err, row) => {
      if (!row) {
        const hash = bcrypt.hashSync("Password@123", 10);
        db.run(
          `INSERT INTO users (name, email, password, address, role)
           VALUES (?, ?, ?, ?, ?)`,
          [
            "Store Owner",
            "owner@test.com",
            hash,
            "Owner Address",
            "owner",
          ],
          () => console.log("Owner seeded")
        );
      }
    }
  );
}

module.exports = seed;
