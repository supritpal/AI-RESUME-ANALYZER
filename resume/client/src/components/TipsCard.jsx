import "../styles/TipsCard.css";
import { FaLightbulb } from "react-icons/fa";

const TipsCard = ({ tips }) => {
  return (
    <div className="tips-card">
      <h3>Improvement Tips</h3>

      {tips.map((tip, i) => (
        <div key={i} className="tip-item">
          <FaLightbulb className="tip-icon" />
          <p>{tip}</p>
        </div>
      ))}
    </div>
  );
};

export default TipsCard;
