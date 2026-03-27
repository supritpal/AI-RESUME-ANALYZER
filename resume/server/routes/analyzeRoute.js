let express = require("express");
let router = express.Router();
let auth = require("../middleware/authmiddleware");
let { analyzeResume } = require("../controllers/analyzeResume");

router.post("/", auth, analyzeResume);

module.exports = router;
