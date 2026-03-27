import { useEffect, useState } from "react";
import "../styles/ScoreCard.css";

const ScoreCard = ({ score }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= score) {
        clearInterval(interval);
      }
      setProgress(start);
    }, 15);
  }, [score]);

  return (
    <div className="score-card">
      <h2>ATS Score</h2>

      <div className="circle">
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default ScoreCard;
