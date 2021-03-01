import React from 'react'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form } from "antd";
import { withFormik } from 'formik';
import * as yup from "yup";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { USER_SIGNUP_API } from '../redux/constants/AwesomeBugs';
import { notification } from 'antd';
import history from "../util/history";
import { USER_LOGIN } from '../util/constants/settingSystem';

function Register(props) {
  let userLogin = {};
  if(localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  }
  
  if(userLogin.id) {
    history.push("/");
    notification["warning"]({
      message: "You are already logged in, you need to log out before create AwesomeBugs user."
    });
  }
    
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="container form-signup">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
        <form onSubmit={handleSubmit} className="w-50">
          <h3 style={{ fontSize: 25 }} className="text-center display-4">Đăng ký tài khoản</h3>
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
          <Form.Item>
            <Input onChange={handleChange} onBlur={handleBlur} prefix={<LockOutlined className="site-form-item-icon" />} name="phoneNumber" type="phoneNumber" placeholder="Phone number"
            />
            {touched.phoneNumber? <div className="text-danger ms-3">{errors.phoneNumber}</div>: ""}
          </Form.Item>
          <Form.Item>
            <Input onChange={handleChange} onBlur={handleBlur} prefix={<LockOutlined className="site-form-item-icon" />} name="name" type="name" placeholder="Name"
            />
            {touched.name? <div className="text-danger ms-3">{errors.name}</div>: ""}
          </Form.Item>

          <Form.Item className="text-center">
            <Button style={{backgroundColor:"rgb(102,117,223)", color:"white"}} htmlType="submit" className="button-login-form" block>
              Đăng kí
            </Button>
          </Form.Item>
          <div className="text-center mb-4">
            <span>Bạn đã có tài khoản?</span>
            <NavLink to="/login" className="navlink-login ms-2">Đăng nhập</NavLink>
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

const RegisterFormWithFormik  = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phoneNumber: ""
  }),
  validationSchema: yup.object().shape({
    email: yup.string()
      .required("Vui lòng nhập email.")
      .email("Email phải có dạng: example@gmail.com!"),
    password: yup.string()
      .required("Vui lòng nhập mật khẩu.")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt."),
    name: yup.string()
      .required("Vui lòng nhập tên người dùng.")
      .min(3, "Tên người dùng phải có ít nhất 3 ký tự.")
      .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/, "Tên người dùng giới hạn từ 3-17 ký tự và không được phép chứa các ký tự đặc biệt."),
    phoneNumber: yup.string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(/^(0)[0-9]{9,10}$/,"Số điện thoại Việt Name bắt đầu bằng số 0, giới hạn trong khoảng 10-11 ký tự")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({
      type: USER_SIGNUP_API,
      newUser: values
    });
  },
})(Register);

export default connect()(RegisterFormWithFormik);
