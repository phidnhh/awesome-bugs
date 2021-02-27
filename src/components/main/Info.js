import React from 'react'
import parse from "html-react-parser";

export default function Info(props) {
  const projectDetail = props.projectDetail;
  const renderAvatar = () => {
    return projectDetail.members?.map((member,index) => {
      return <div key={index} className="avatar">
        <img src={`${member.avatar}&background=random&color=random`} alt={member.name} />
    </div>
    })
  }
  return (
    <>
      <div className="project-description"> { projectDetail.description? parse(projectDetail.description): "" } </div>
      <div className="info" style={{display: 'flex'}}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{display: 'flex'}}>
          {renderAvatar()}
        </div>
        <div style={{marginLeft: 20}} className="text">Only My Issues</div>
        <div style={{marginLeft: 20}} className="text">Recently Updated</div>
      </div>
    </>
  )
}
