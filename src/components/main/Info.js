import React from 'react'
import avatar1 from "./../../assets/avatar/avatar1.jfif";
import avatar2 from "./../../assets/avatar/avatar2.jfif";
import avatar3 from "./../../assets/avatar/avatar3.jfif";

export default function Info() {
  return (
    <>
      <h3>Cyber Board</h3>
      <div className="info" style={{display: 'flex'}}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{display: 'flex'}}>
          <div className="avatar">
            <img src={avatar1} alt="avatar" />
          </div>
          <div className="avatar">
            <img src={avatar2} alt="avatar" />
          </div>
          <div className="avatar">
            <img src={avatar3} alt="avatar" />
          </div>
        </div>
        <div style={{marginLeft: 20}} className="text">Only My Issues</div>
        <div style={{marginLeft: 20}} className="text">Recently Updated</div>
      </div>
    </>
  )
}
