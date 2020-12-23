import React, { Component, useContext, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Navi } from './Navi';

import { Table, Input, Form } from "antd";
import { Menu, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import * as actions from '../redux/actions/resrcAction';
import { parseDatasources, createColumns } from "../redux/selectors/resrcSelectors";

const { Search } = Input;

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

export class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      colInput: false,
      csvPath: false,
      filteredRes: [],
      usingFilteredRes: false
    };
  }

  componentDidMount() {
    console.log("Resource component Initiate");
    this.props.load(this.props.authReducer.token);
    this.setState({
      count: (this.props.datasource === null) ? 0 : this.props.datasource.length
    });
  }

  handleSave = row => {
    console.log(row);
    const newData = [...this.props.datasource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    console.log(item);

    let values = null;
    Object.keys(row).forEach(key => {
      if (row[key] !== item[key]) {
        console.log("gg");
        values = { key: row["key"], name: key, value: row[key] };
      }
    });

    this.props.handleUpdate(this.props.authReducer.token, values);

    this.setState ({
      usingFilteredRes: false
    });

    // newData.splice(index, 1, { ...item, ...row });
    // this.setState({
    //   dataSource: newData
    // });
  };

  handleMenuClick = e => {
    // message.info("Click on menu item.");
    // console.log('click', e);
    if (e.key === "1") {
      this.setState ({
        usingFilteredRes: false
      });
  
      this.props.handleAdd(this.props.authReducer.token);
    } else if (e.key === "2") {
      this.setState({
        colInput: true
      });
    } else {
      this.setState({
        csvPath: true
      });
    }
  };

  render() {
    // const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = (this.props.columns === null) ? null :
      this.props.columns.map(col => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave
          })
        };
      });

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Add a row</Menu.Item>
        <Menu.Item key="2">Add a column</Menu.Item>
        <Menu.Item key="3">Import a CSV file</Menu.Item>
      </Menu>
    );

    return (
      <div className="Resource">
        <div className="left-box">
          <Navi />
        </div>
        <div className="right-box">
          <div className="header-box">
            <Search
              placeholder="input here"
              allowClear
              onSearch={value => this.setState({
                filteredRes: this.props.datasource.filter((ele) => ele.name.startsWith(value)),
                usingFilteredRes: true
              })}
              style={{width:"200px", marginLeft: "1px"}}
            />
            <h3>Resource Catalog</h3>
            <div style={{ display: "flex", marginRight: "1px"}}>
              <Dropdown.Button
                overlay={menu}
                placement="bottomCenter"
                icon={<PlusOutlined />}
              />
              {
                this.state.colInput ?
                  <Search
                    placeholder="input here"
                    allowClear
                    enterButton="Add"
                    // size="small"
                    onSearch={value => {
                      this.props.handleAddCol(this.props.authReducer.token, value)
                      this.setState({
                        colInput: false,
                        usingFilteredRes: false
                      });
                    }}
                  />
                  : null
              }
              {
                this.state.csvPath ?
                  <Search
                    placeholder="input relative path here"
                    allowClear
                    enterButton="Import"
                    // size="small"
                    onSearch={value => {
                      this.props.handleCSV(this.props.authReducer.token, value)
                      this.setState({
                        csvPath: false,
                        usingFilteredRes: false
                      });
                    }}
                  />
                  : null
              }
            </div>
          </div>
          <div style={{ width: "1000px" }}>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={this.state.usingFilteredRes ? this.state.filteredRes : this.props.datasource}
              columns={columns}
              scroll={{ x: 1500 }}
              pagination={{ pageSize: 7 }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("Resource Redux Initiate");
  const { resrcReducer, authReducer } = state;
  const columns = (resrcReducer.datasource === undefined || resrcReducer.datasource.length === 0) ? null : createColumns(resrcReducer.datasource);
  const datasource = (resrcReducer.datasource === undefined || resrcReducer.datasource.length === 0) ? null : parseDatasources(resrcReducer.datasource);
  return { authReducer, datasource, columns };
}

const mapDispatchToProps = dispatch => {
  return {
    load: values => dispatch(actions.getResource(values)),
    handleAdd: values => dispatch(actions.addRow(values)),
    handleUpdate: (token, values) => dispatch(actions.update(token, values)),
    handleAddCol: (token, value) => dispatch(actions.addColumn(token, value)),
    handleCSV: (token, value) => dispatch(actions.importCSV(token, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource)
