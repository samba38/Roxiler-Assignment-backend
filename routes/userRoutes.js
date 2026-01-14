const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const user = require("../controllers/userController");

router.get("/stores", auth, role("user"), user.getStores);
router.post("/rate", auth, role("user"), user.rateStore);

module.exports = router;
