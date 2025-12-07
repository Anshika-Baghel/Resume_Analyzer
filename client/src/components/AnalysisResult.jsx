import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import './AnalysisResult.css';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const data = result.analysisResult || result; // Handle both full document or just analysis
  const { score, summary, improvements, missingSkills, strengths } = data;

  const getScoreColor = (s) => {
    if (s >= 80) return 'var(--success-color)';
    if (s >= 60) return 'var(--warning-color)';
    return 'var(--error-color)';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="result-container"
    >
      <div className="score-section glass-panel">
        <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
          <span className="score-value" style={{ color: getScoreColor(score) }}>{score}%</span>
        </div>
        <div className="score-info">
          <h3>Match Score</h3>
          <p>Based on the job description provided.</p>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="card glass-panel full-span">
          <h3 className="card-title">Professional Summary</h3>
          <p className="summary-text">{summary}</p>
        </div>

        <div className="card glass-panel">
          <h3 className="card-title text-success">
            <CheckCircle size={20} /> Strengths
          </h3>
          <ul className="list">
            {strengths?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="card glass-panel">
          <h3 className="card-title text-error">
            <XCircle size={20} /> Missing Skills
          </h3>
          <div className="chips">
            {missingSkills?.map((skill, i) => (
              <span key={i} className="chip">{skill}</span>
            ))}
          </div>
        </div>

        <div className="card glass-panel full-span">
          <h3 className="card-title text-warning">
            <AlertCircle size={20} /> Recommended Improvements
          </h3>
          <ul className="list">
            {improvements?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
