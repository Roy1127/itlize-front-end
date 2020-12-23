import React from 'react'
import { connect } from 'react-redux'
import { Navi } from './Navi';

import { Menu, Dropdown } from 'antd';

import ProjectResource from './ProjectResource';
import ProjectProject from './ProjectProject';

const handleButtonClick = (e) => {
  console.log('click left button', e);
}

const handleMenuClick = (e) => {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" >
      Project 1
    </Menu.Item>
  </Menu>
);


export const Project = (props) => {
  return (
    <div className="Project">
      <div className="left-box">
        <Navi />
      </div>
      <div className="right-box">
        <div className="upper-box">
          <Dropdown.Button onClick={handleButtonClick} overlay={menu} style={{marginBottom:"30px"}}>
            Project 1
          </Dropdown.Button>
        </div>
        <div className="bot-box">
          <ProjectResource />
          <ProjectProject />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
