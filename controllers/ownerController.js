const db = require("../config/db");

exports.ownerDashboard = (req, res) => {
  const query = `
    SELECT u.name, r.rating
    FROM ratings r
    JOIN users u ON r.user_id=u.id
    JOIN stores s ON r.store_id=s.id
    WHERE s.owner_id=?
  `;
  db.all(query, [req.user.id], (_, rows) => res.json(rows));
};
