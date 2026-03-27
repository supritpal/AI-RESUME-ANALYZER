let mongoose = require("mongoose");

let resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: String,
    filePath: String,
    extractedText: String,
    skills: [String],
  },
  { timestamps: true },
);

let Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
