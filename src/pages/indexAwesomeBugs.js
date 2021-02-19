import React from 'react'
import Content from '../components/main/Content'
import Header from '../components/main/Header'
import Info from '../components/main/Info'

export default function indexAwesomeBugs() {
  return (
    <div className="main">
      <Header/>
      <Info/>
      <Content/>
    </div>
  )
}
