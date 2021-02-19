import React from 'react'
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
        <div>
          <i className="fa fa-credit-card" />
          <span>Cyber Board</span>
        </div>
        <div>
          <i className="fa fa-cog" />
          <span>Project Settings</span>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  )
}
