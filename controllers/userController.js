const db = require("../config/db");

exports.getStores = (req, res) => {
  const query = `
    SELECT s.id, s.name, s.address,
    IFNULL(AVG(r.rating),0) as avgRating
    FROM stores s
    LEFT JOIN ratings r ON s.id=r.store_id
    GROUP BY s.id
  `;
  db.all(query, [], (_, rows) => res.json(rows));
};

exports.rateStore = (req, res) => {
  const { store_id, rating } = req.body;

  const query = `
    INSERT OR REPLACE INTO ratings (user_id,store_id,rating)
    VALUES (?,?,?)
  `;

  db.run(query, [req.user.id, store_id, rating], () =>
    res.json({ message: "Rating submitted" })
  );
};
