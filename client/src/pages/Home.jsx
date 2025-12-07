import { useState } from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import AnalysisResult from '../components/AnalysisResult';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (file, jobDescription) => {
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/resume/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
      // specific scroll or animation could be added here
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please ensure the server is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container main-content">
        <header className="hero">
          <h1>Optimize Your <span className="text-gradient">Resume</span></h1>
          <p className="hero-subtitle">Get AI-powered feedback, score, and improvements to land your dream job.</p>
        </header>
        
        <FileUpload onAnalyze={handleAnalyze} isLoading={loading} />
        
        {error && (
          <div className="error-message animate-fade-in">
            {error}
          </div>
        )}

        {result && <AnalysisResult result={result} />}
      </div>
    </div>
  );
};

export default Home;
