import React from 'react'
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <Result
        status="404"
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại! Bạn có thể thử những liên kết sau."
        extra={
          <div className="error404-category">
          <h5 className="text-center text-info">Bạn có thể thử những liên kết sau</h5>
          <hr/>
          <div className="error404-category-list">
            <Button className="error404-button-category me-3" type="primary" shape="circle" size="large">
              <NavLink to="/">
                <i className="fa fa-home"></i>
              </NavLink>
            </Button>
            <Button className="error404-button-category me-3" type="primary" shape="circle" size="large">
              <NavLink to="/projectmanagement">
                <i className="fa fa-cog" />
              </NavLink>              
            </Button>
            <Button className="error404-button-category me-3" type="primary" shape="circle" size="large">
              <NavLink to="/createproject">
                <i className="fa fa-edit"></i>
              </NavLink>
            </Button>
          </div>
        </div>
        }
      />
    </>
  )
}
