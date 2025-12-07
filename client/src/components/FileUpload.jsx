import { useState } from 'react';
import { Upload, File, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './FileUpload.css';

const FileUpload = ({ onAnalyze, isLoading }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && jobDescription) {
      onAnalyze(file, jobDescription);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="upload-container glass-panel"
    >
      <h2>Analyze Your Resume</h2>
      <p className="subtitle">See how well your resume matches the job description.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Description</label>
          <textarea 
            className="input-field"
            rows="6"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Resume (PDF)</label>
          <div className="file-drop-zone">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              id="file-upload"
              className="file-input"
              required
            />
            <label htmlFor="file-upload" className="file-label">
              {file ? (
                <div className="file-selected">
                  <File className="icon" />
                  <span>{file.name}</span>
                  <span className="change-text">Change</span>
                </div>
              ) : (
                <div className="file-placeholder">
                  <Upload className="icon" />
                  <span>Click to Upload PDF</span>
                  <small>Maximum size: 5MB</small>
                </div>
              )}
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary full-width"
          disabled={isLoading || !file || !jobDescription}
        >
          {isLoading ? (
            <>
              <Loader2 className="icon spin" /> Analyzing with AI...
            </>
          ) : (
            'Start Analysis'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default FileUpload;
