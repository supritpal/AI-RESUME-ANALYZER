const Resume = require("../models/resume");
const pdf = require("pdf-parse");
const axios = require("axios");
const skillset = require("../utils/skills");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Cloudinary URL
    const filePath = req.file.path;

    // =========================
    // 🔥 FETCH FILE FROM CLOUD
    // =========================
    const response = await axios.get(filePath, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdf(response.data);

    const cleanText = pdfData.text
      .replace(/\.js/g, "")
      .replace(/[^\w\s]/gi, "")
      .toLowerCase();

    const foundSkill = skillset.filter((skill) =>
      cleanText.includes(skill.toLowerCase()),
    );

    // =========================
    // 💾 SAVE TO DB
    // =========================
    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      filePath: filePath, // Cloud URL
      extractedText: pdfData.text,
      skills: foundSkill,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
