const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const admin = require("../controllers/adminController");

router.get("/dashboard", auth, role("admin"), admin.dashboard);
router.post("/stores", auth, role("admin"), admin.addStore);
router.get("/users", auth, role("admin"), admin.listUsers);
router.get("/stores", auth, role("admin"), admin.listStores);

module.exports = router;
