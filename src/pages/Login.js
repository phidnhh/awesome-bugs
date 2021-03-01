import React, { useEffect } from 'react'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form } from "antd";
import { withFormik } from 'formik';
import * as yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from '../redux/constants/AwesomeBugs';
import history from "./../util/history";
import { USER_LOGIN } from '../util/constants/settingSystem';
import { notification } from 'antd';
import { NavLink } from 'react-router-dom';

function Login(props) { 
  let userLogin = {};
  if(localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  }
  
  useEffect(() => {
    if(userLogin.id) {
      history.push("/");
      notification["warning"]({
        message: "You are already logged in, you need to log out before logging in as different user.",
      });
    }
  }, []);
  
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="container form-login">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
        <form onSubmit={handleSubmit} className="w-50">
          <h3 style={{ fontSize: 25 }} className="text-center display-4">Welcome To AwesomeBugs</h3>
          <hr className=""/>
          <Form.Item>
            <Input onChange={handleChange} onBlur={handleBlur} name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            {touched.email? <div className="text-danger ms-3">{errors.email}</div>: ""}
          </Form.Item>          
          <Form.Item>
            <Input onChange={handleChange} onBlur={handleBlur} prefix={<LockOutlined className="site-form-item-icon" />} name="password" type="password" placeholder="Password"
            />
            {touched.password? <div className="text-danger ms-3">{errors.password}</div>: ""}
          </Form.Item>

          <Form.Item className="text-center">
            <Button style={{backgroundColor:"rgb(102,117,223)", color:"white"}} htmlType="submit" className="button-login-form" block>
              Đăng Nhập
            </Button>
          </Form.Item>
          <div className="text-center mb-4">
            <span>Bạn chưa có tài khoản?</span>
            <NavLink to="/register" className="navlink-login ms-2">Đăng kí</NavLink>
          </div>
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
    </div>
  )
}

const LoginFormWithFormik  = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    email: yup.string()
      .required("Vui lòng nhập email.")
      .email("Email phải có dạng: example@gmail.com!"),
    password: yup.string()
      .required("Vui lòng nhập mật khẩu.")
  }),
  handleSubmit: ({email, password}, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({
      type: USER_SIGNIN_API,
      userLogin: {
        email,
        password
      }
    });
  },
})(Login);

export default connect()(LoginFormWithFormik);
