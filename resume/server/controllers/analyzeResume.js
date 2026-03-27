const Resume = require("../models/resume");
const skillset = require("../utils/skills");
const axios = require("axios");

exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription, resumeId } = req.body;

    if (!jobDescription || !resumeId) {
      return res.status(400).json({
        message: "jobDescription and resumeId are required",
      });
    }

    const cv = await Resume.findById(resumeId);

    if (!cv) {
      return res.status(404).json({ message: "Resume not found" });
    }

    let similarityScore = 0;

    try {
      const hfResponse = await axios.post(
        "https://router.huggingface.co/hf-inference/models/sentence-transformers/paraphrase-MiniLM-L3-v2",
        {
          inputs: {
            source_sentence: cv.extractedText,
            sentences: [jobDescription],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          },
        },
      );

      console.log("HF RESPONSE:", hfResponse.data);

      if (Array.isArray(hfResponse.data)) {
        similarityScore = Math.round(hfResponse.data[0] * 100);
      }
    } catch (err) {
      console.log("HF ERROR:", err.response?.data || err.message);
    }

    const cleanJd = jobDescription
      .trim()
      .replace(/\.js/g, "")
      .replace(/[^\w\s]/gi, "")
      .toLowerCase();

    const requiredSkill = skillset.filter((skill) =>
      cleanJd.includes(skill.toLowerCase()),
    );

    const matchedSkill = cv.skills.filter((skill) =>
      requiredSkill.includes(skill),
    );

    const missingSkill = requiredSkill.filter(
      (skill) => !cv.skills.includes(skill),
    );

    const skillScore =
      requiredSkill.length === 0
        ? 0
        : Math.round((matchedSkill.length / requiredSkill.length) * 100);

    const finalScore = Math.round(skillScore * 0.6 + similarityScore * 0.4);

    let improvementTips = new Set();

    if (missingSkill.length > 0) {
      improvementTips.add(
        `Consider adding experience with ${missingSkill.join(", ")}`,
      );
    }

    if (similarityScore < 60) {
      improvementTips.add(
        "Align your resume content more closely with the job description",
      );
    }

    if (cv.skills.length < 5) {
      improvementTips.add(
        "Adding more technical skills can improve your ATS ranking",
      );
    }

    if (!cv.extractedText.toLowerCase().includes("project")) {
      improvementTips.add(
        "Include project experience to strengthen your resume",
      );
    }

    if (finalScore > 85) {
      improvementTips.add(
        "Your resume matches this job very well. Consider applying!",
      );
    }

    res.json({
      requiredSkill,
      matchedSkill,
      missingSkill,
      skillScore,
      similarityScore,
      finalScore,
      improvementTips: [...improvementTips],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
