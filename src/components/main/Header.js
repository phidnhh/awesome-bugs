import React from 'react'

export default function Header(props) {
  return (
    <>
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{backgroundColor: 'white'}}>
            <li className="breadcrumb-item active">Projects</li>
            <li className="breadcrumb-item active">{props.breadcrumb[0]}</li>
            {
              props.breadcrumb[1]? <li className="breadcrumb-item active">{props.breadcrumb[1]}</li> : ""
            }
          </ol>
        </nav>
      </div>
      <h3>{props.breadcrumb[0]}</h3>
    </>
  )
}
