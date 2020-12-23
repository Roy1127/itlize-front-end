import React from 'react'

import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import * as actions from '../redux/actions/authAction';

export const Login = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    props.onAuth(values);
  };

  return (
    <div style={{marginLeft:"35%", width:"35%"}}>
      <h1 className="login-title">Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
        </Button>
        Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer
})

const mapDispatchToProps = dispatch => {
  return {
    onAuth: values => dispatch(actions.auth(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
