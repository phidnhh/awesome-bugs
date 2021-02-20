import React from 'react'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form } from "antd";
import { withFormik } from 'formik';
import * as Yup from "yup";
import { connect } from "react-redux";
import { signinAction } from '../redux/actions/AwesomeBugsAction';

function Login(props) {
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
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu.")
  }),
  handleSubmit: ({email, password}, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(signinAction(email, password, props.history));
  },
})(Login);

export default connect()(LoginFormWithFormik);
