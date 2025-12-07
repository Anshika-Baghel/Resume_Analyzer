import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
    const [stats, setStats] = useState({ totalResumes: 0, avgScore: 0 });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/resume/analytics`)
             .then(res => setStats(res.data))
             .catch(err => console.error(err));
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="container main-content">
                 <h2 className="section-title">Admin Analytics</h2>
                 <div className="stats-grid">
                     <div className="stat-card glass-panel">
                         <h3>Total Resumes Analyzed</h3>
                         <p className="stat-value">{stats.totalResumes}</p>
                     </div>
                     <div className="stat-card glass-panel">
                         <h3>Average Resume Score</h3>
                         <p className="stat-value">{stats.avgScore}%</p>
                     </div>
                 </div>
            </div>
        </div>
    );
};
export default Admin;
