import React from "react";
import { Link } from "react-router-dom"
import { Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";


export class Navi extends React.Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // handleMenuClick = e => {
  //   console.log('click', e);
  // };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 15 }}
        >
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        {this.state.collapsed ? null : (
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1"><Link to="/resource">Resource</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/project">Project</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/resource">Formula</Link></Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}