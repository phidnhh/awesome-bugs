import React from 'react'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form, Checkbox } from "antd";
import { ErrorMessage } from 'formik';

export default function Login() {
  return (
    <div className="container form-login">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
        <form className="w-50">
          <h3 style={{ fontSize: 25 }} className="text-center display-4">Welcome To AwesomeBugs</h3>
          <hr className=""/>
          <Form.Item>
            <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} name="password" type="password" placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button style={{backgroundColor:"rgb(102,117,223)", color:"white"}} htmlType="submit" className="button-login-form" block>
              Đăng Nhập
            </Button>
          </Form.Item>
          <div className="division">
            <div className="line l"></div>
            <span>hoặc</span>
            <div className="line r"></div>
          </div>
          <Form.Item className="text-center icons-list">
            <Button style={{ backgroundColor: "#4267B2" }} type="primary" shape="circle" size="large" icon={<i className="fab fa-facebook-f"/>} />
            &nbsp;&nbsp;
            <Button className="btn btn-social-icon btn-facebook" type="danger" shape="circle" size="large" icon={<i className="fab fa-google"/>} />
          </Form.Item>
        </form>
      </div>
      <div className="row">
        
      </div>

    </div>
  )
}
