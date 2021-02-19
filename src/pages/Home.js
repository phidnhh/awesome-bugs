import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const userLogin = useSelector(state => state.UserReducer.userLogin);
  return (
    <div>
      Trang chủ nèkk
      <div>{userLogin.name}</div>
      <img src={userLogin.avatar} />
    </div>
  )
}
