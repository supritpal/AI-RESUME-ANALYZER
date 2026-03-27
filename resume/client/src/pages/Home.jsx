import { useState } from "react";
import "../styles/Home.css";
import UploadBox from "../pages/UploadBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🔥 add this at top

  const handleAnalyze = async () => {
    const resumeId = localStorage.getItem("resumeId");
    const token = localStorage.getItem("token");

    if (!token) return toast.error("Please login first");
    if (!resumeId) return toast.error("Please upload resume first");
    if (!jobDescription) return toast.error("Enter job description");

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        {
          resumeId,
          jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.setItem("resultData", JSON.stringify(res.data));

      navigate("/result");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>🚀 AI Resume Analyzer</h1>

        <UploadBox />

        <div className="input-group">
          <label>Job Description</label>
          <textarea
            placeholder="Paste Job Description"
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
};

export default Home;
