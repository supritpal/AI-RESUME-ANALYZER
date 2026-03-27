const express = require("express");
const router = express.Router();
let upload = require("../config/multer");
let auth = require("../middleware/authmiddleware");
let { uploadResume } = require("../controllers/resumeController");

router.post("/upload", auth, upload.single("resume"), uploadResume);

module.exports = router;
