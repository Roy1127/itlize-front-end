import React from 'react'
import { connect } from 'react-redux'
import logo from "../assets/images/logo.svg"
import * as actions from '../redux/actions/authAction';

import { Link } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import '../styles/App.css'

export const TopBar = (props) => {
  console.log(props);

  const handleMenuClick = e => {
    console.log('click', e);
    if (e.key === "4") {
      console.log("gg");
      props.onLogout(props.authReducer.token);
    }
  };

  const menu = (
    <Menu theme="dark" onClick={handleMenuClick}>
      <Menu.Item key="1">
        {props.authReducer.user.username}
      </Menu.Item>
      <Menu.Item key="2">
        {'Member since ' + props.authReducer.user.creationTime}
      </Menu.Item>
      <Menu.Item key="3">
        Profile
      </Menu.Item>
      <Menu.Item key="4">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="App-header">
      <div className="left-box">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="home">
          <span className="App-title">Resouce Management</span>
        </Link>
      </div>
      <div className="right-box">
        <div className="left-box">
          {
            props.authReducer.isAuthenticated ?
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  shape="circle"
                  icon={<UserOutlined />}
                />
              </Dropdown> :
              <Avatar
                style={{
                  backgroundColor: '#87d068',
                }}
                shape="circle"
                icon={<UserOutlined />}
              />
          }
          <span style={{ paddingLeft: "15px", fontSize: "3ex", fontFamily:"monospace", fontWeight:"bold"}}>{props.authReducer.user.username}</span>
        </div>
        <div className="right-box">
          <QuestionCircleOutlined style={{ fontSize: '30px' }}/>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: values => dispatch(actions.logout(values)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
