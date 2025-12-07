import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Calendar, FileText, ChevronRight } from 'lucide-react';
import './History.css';
import AnalysisResult from '../components/AnalysisResult';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume/history`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container main-content">
        <h2 className="section-title">Analysis History</h2>
        
        {loading ? (
          <p className="loading-text">Loading history...</p>
        ) : history.length === 0 ? (
          <div className="empty-state glass-panel">
            <p>No analysis history found. Upload a resume to get started!</p>
          </div>
        ) : (
          <div className="history-layout">
            <div className="history-list">
              {history.map((item) => (
                <div 
                  key={item._id} 
                  className={`history-item glass-panel ${selectedItem?._id === item._id ? 'active' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="history-icon">
                    <FileText size={24} />
                  </div>
                  <div className="history-info">
                    <h3>{item.originalName}</h3>
                    <div className="history-meta">
                      <span className="date"><Calendar size={14}/> {formatDate(item.uploadDate)}</span>
                      <span className={`score-badge ${item.analysisResult?.score >= 70 ? 'good' : 'average'}`}>
                        {item.analysisResult?.score}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="arrow-icon" />
                </div>
              ))}
            </div>

            {selectedItem && (
              <div className="history-details animate-fade-in">
                <div className="details-header glass-panel">
                  <h3>Analysis Details</h3>
                  <button className="btn-close" onClick={() => setSelectedItem(null)}>Close</button>
                </div>
                <AnalysisResult result={selectedItem} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
