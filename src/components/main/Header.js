import React from 'react'

export default function Header(props) {
  return (
    <>
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{backgroundColor: 'white'}}>
            <li className="breadcrumb-item">Projects</li>
            <li className="breadcrumb-item">{props.breadcrumb[0]}</li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.breadcrumb[1]}
            </li>
          </ol>
        </nav>
      </div>
      <h3>{props.breadcrumb[1]}</h3>
    </>
  )
}
