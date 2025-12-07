import { Link } from 'react-router-dom';
import { FileText, History, BarChart2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <FileText className="icon" />
          <span>Resume<span className="text-gradient">AI</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Analyzer</Link>
          <Link to="/history" className="nav-link">History</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
