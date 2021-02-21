import React from 'react'
import { NavLink } from 'react-router-dom';
import avatarLogo from "./../assets/avatar/avatar-logo.png";

export default function Menu() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={avatarLogo} alt="avatar logo phidndev" />
        </div>
        <div className="account-info">
          <p>phidndev</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <NavLink to="/awesomebugs" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-credit-card" />
          <span>Awesome Board</span>
        </NavLink>
        <NavLink to="/projectmanagement" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-cog" />
          <span>Project Management</span>
        </NavLink>
        <NavLink to="/createproject" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-edit"></i>
          <span>Create Project</span>
        </NavLink>
      </div>
      <div className="feature">
        <NavLink to="/Releases" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-truck" />
          <span>Releases</span>
        </NavLink>
        <NavLink to="/Issuesandfilters" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </NavLink>
        <NavLink to="/Pages" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-paste" />
          <span>Pages</span>
        </NavLink>
        <NavLink to="/Reports" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </NavLink>
        <NavLink to="/Components" className="awesomebugs-menu-item" activeClassName="activeNavlink">
          <i className="fa fa-box" />
          <span>Components</span>
        </NavLink>
      </div>
    </div>
  )
}
