import React from 'react'
import Content from '../components/main/Content'
import Header from '../components/main/Header'
import Info from '../components/main/Info'

export default function indexAwesomeBugs(props) {
  return (
    <div className="main">
      <Header breadcrumb={ ["Awesome Bugs 1.0", "Awesome Board"] } />
      <Info/>
      <Content/>
    </div>
  )
}
