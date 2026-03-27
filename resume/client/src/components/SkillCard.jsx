import "../styles/SkillCard.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SkillCard = ({ title, skills, type }) => {
  return (
    <div className="skill-card">
      <h3>{title}</h3>

      <div className="skills">
        {skills.length === 0 ? (
          <p>No skills</p>
        ) : (
          skills.map((skill, i) => (
            <div key={i} className="skill-item">
              {type === "match" ? (
                <FaCheckCircle className="icon green" />
              ) : (
                <FaTimesCircle className="icon red" />
              )}
              <span>{skill}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillCard;
