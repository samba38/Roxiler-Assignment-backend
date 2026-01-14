const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, address } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (name,email,password,address,role)
                 VALUES (?,?,?,?,?)`;

  db.run(query, [name, email, hashed, address, "user"], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "User registered" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email=?`, [email], async (err, user) => {
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  });
};
