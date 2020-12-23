import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

import * as actions from '../redux/actions/projectAction';
import { parseDatasources } from "../redux/selectors/resrcSelectors";

const columns = [
  {
    title: 'Resource Name',
    dataIndex: 'name',
  },
  {
    title: 'Resource Code',
    dataIndex: 'code',
  },
];

export class ProjectProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }


  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    console.log("ProjectProject component initiate")
    this.props.load(this.props.authReducer.token);
  }

  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="ProjectProject">
        <div className="header-box">
          <h3 style={{ marginRight: "190px", marginTop: "5px" }}>Project</h3>
          <Button icon={<DeleteOutlined />} 
                  onClick={() => this.props.delete(this.props.authReducer.token, selectedRowKeys)} 
                  style={{ marginRight: "25px", fontSize: '20px' }} 
          />
        </div>
        <div className="bot-box">
          <Table bordered rowSelection={rowSelection} columns={columns} dataSource={this.props.datasource} pagination={{ pageSize: 7 }} style={{ minWidth: "100%" }} />
        </div>
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  console.log("ProjectProject Redux Initiate");
  const { projectReducer, authReducer } = state;
  const datasource = (projectReducer.projdatasource === undefined || projectReducer.projdatasource.length === 0) ? null : parseDatasources(projectReducer.projdatasource);
  return { authReducer, datasource };
}

const mapDispatchToProps = dispatch => {
  return {
    load: values => dispatch(actions.getProjResource(values)),
    delete: (token, values) => dispatch(actions.deleteResrc(token, values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProject)
