import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

import * as actions from '../redux/actions/resrcAction';
import * as projActions from '../redux/actions/projectAction';
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


export class ProjectResource extends Component {
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
    console.log("ProjectResource component initiate")
    this.props.load(this.props.authReducer.token);
  }


  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="ProjectResource">
        <div className="header-box">
          <h3 style={{ marginRight: "150px", marginTop: "5px" }}>Resource Catalog</h3>
          <Button icon={<PlusOutlined />} 
                  onClick={() => this.props.add(this.props.authReducer.token, selectedRowKeys)} 
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
  console.log("ProjectResource Redux Initiate");
  const { resrcReducer, authReducer } = state;
  const datasource = (resrcReducer.datasource === undefined || resrcReducer.datasource.length === 0) ? null : parseDatasources(resrcReducer.datasource);
  return { authReducer, datasource };
}

const mapDispatchToProps = dispatch => {
  return {
    load: values => dispatch(actions.getResource(values)),
    add: (token, values) => dispatch(projActions.addResrc(token, values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectResource)
