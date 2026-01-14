const db = require("../config/db");

exports.dashboard = (req, res) => {
  const data = {};

  db.get("SELECT COUNT(*) as users FROM users", (_, u) => {
    data.users = u.users;

    db.get("SELECT COUNT(*) as stores FROM stores", (_, s) => {
      data.stores = s.stores;

      db.get("SELECT COUNT(*) as ratings FROM ratings", (_, r) => {
        data.ratings = r.ratings;
        res.json(data);
      });
    });
  });
};

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  db.run(
    "INSERT INTO stores (name,email,address,owner_id) VALUES (?,?,?,?)",
    [name, email, address, owner_id],
    () => res.json({ message: "Store added" })
  );
};

exports.listUsers = (req, res) => {
  db.all(
    "SELECT id,name,email,address,role FROM users",
    [],
    (_, rows) => res.json(rows)
  );
};

exports.listStores = (req, res) => {
  const query = `
    SELECT s.*, IFNULL(AVG(r.rating),0) as rating
    FROM stores s
    LEFT JOIN ratings r ON s.id=r.store_id
    GROUP BY s.id
  `;
  db.all(query, [], (_, rows) => res.json(rows));
};
