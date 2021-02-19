import React from 'react'
import { Result, Button } from 'antd';

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
              <i className="fa fa-home"></i>
            </Button>
            <Button className="error404-button-category me-3" type="primary" shape="circle" size="large">
              <i className="fa fa-home"></i>
            </Button>
            <Button className="error404-button-category me-3" type="primary" shape="circle" size="large">
              <i className="fa fa-home"></i>
            </Button>
          </div>
        </div>
        }
      />
    </>
  )
}
