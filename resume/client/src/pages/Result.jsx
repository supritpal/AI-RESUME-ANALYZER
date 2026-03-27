import { useEffect, useState } from "react";
import "../styles/Result.css";
import ScoreCard from "../components/ScoreCard";
import SkillCard from "../components/SkillCard";
import TipsCard from "../components/TipsCard";

const Result = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("resultData");

    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        <h2>No Analysis Found </h2>
        <p>Please upload and analyze first</p>
      </div>
    );
  }

  return (
    <div className="result-page">
      <ScoreCard score={data.finalScore} />

      <div className="skills-container">
        <SkillCard
          title="Matched Skills"
          skills={data.matchedSkill}
          type="match"
        />
        <SkillCard
          title="Missing Skills"
          skills={data.missingSkill}
          type="missing"
        />
      </div>

      <div className="progress-section">
        <h3>Skill Match</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${data.skillScore}%` }}
          ></div>
        </div>
        <p>{data.skillScore}% matched</p>
      </div>

      <TipsCard tips={data.improvementTips} />
    </div>
  );
};

export default Result;
