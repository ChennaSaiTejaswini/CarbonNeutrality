import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import websiteImage from './websiteimage.png';

const Navbar = () => {

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);   

  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={websiteImage} alt="Website Logo" className="navbar__logo-image" /> 
        </Link>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item"><Link to="/MineSummary" className="navbar__link">Coal Mine Summary</Link></li>
        <li className="navbar__item"><Link to="/EmissionSummary" className="navbar__link">Emission Summary</Link></li>
        <li className="navbar__item"><Link to="/GapAnalysis" className="navbar__link">Gap Analysis</Link></li>
        <li className="navbar__item"><Link to="/Mainneutrality" className="navbar__link">Carbon Neutrality</Link></li>
        <li className="navbar__item"><Link to="/mineLocation" className="navbar__link">Locations</Link></li> 
        <li className="navbar__item"><a href="#about" className="navbar__link">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
