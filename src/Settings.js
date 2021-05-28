import React from 'react';
import moment from 'moment';
import './App.css';
import { Layout, Button, Menu, Dropdown, Modal, Select, Form, Input, DatePicker, Space, AutoComplete, message } from 'antd';
import { EllipsisOutlined, SettingFilled, ShareAltOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;

const SettingsForm = (props) => {
  const [form] = Form.useForm();

  const options = [
    { value: 'Book Out' },
    { value: 'Block Leave' },
    { value: 'Book In' },
    { value: 'Live Firing (BTP)' },
    { value: 'Live Grenade Throw' },

  ];

  const dateFormat = 'DD/MM/YYYY';
  return (
    <Form
      form={form}
      name="settingsForm"
      className="settingsForm"
      onFinish={async (values) => {
        console.log(values)
        let events = []
        if (typeof values.events !== "undefined") {
          //Set all event dates to JSON format
          for (let i = 0; i < values.events.length; i++) {
            const current = values.events[i]
            const jsonTime = moment(current.eventTime).startOf('day').toJSON()
            events.push({event: current.event, eventTime: jsonTime })
          }
 
        }

        let countDownSettings = {
          POPDate: moment(values.POPDate).startOf('day').toJSON(),
          ORDDate: moment(values.ORDDate).startOf('day').toJSON(),
          events: events
        }
        console.log(countDownSettings)
        localStorage.setItem('countDownSettings', JSON.stringify(countDownSettings))
        message.success("Updated settings successfully.")
        props.setState({settingsModal: false})
      }}
    >


      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ marginRight: "2ch" }}>Date of POP: </h3>
        <Form.Item
          name="POPDate"
          rules={[{ required: true, message: "Missing POP Date" }]}
        >
          <DatePicker placeholder="Select POP Date" format={dateFormat}  />
        </Form.Item>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ marginRight: "2ch" }}>Date of ORD: </h3>
        <Form.Item
          name="ORDDate"
          rules={[{ required: true, message: "Missing ORD Date" }]}
        >
          <DatePicker placeholder="Select ORD Date" format={dateFormat}  />
        </Form.Item>
      </div>

      <h2>Events</h2>
      <Form.List name="events" >
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8, justifyContent: "center" }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, "event"]}
                    fieldKey={[field.fieldKey, "event"]}
                    rules={[{ required: true, message: 'Missing event' }]}
                  >
                    <AutoComplete
                      options={options}
                      placeholder="Enter an event"
                      filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                      style={{ width: "25ch" }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "eventTime"]}
                    fieldKey={[field.fieldKey, "eventTime"]}
                    rules={[{ required: true, message: 'Missing time for event' }]}
                  >
                    <DatePicker placeholder="Select a Date" format={dateFormat} />
                  </Form.Item>

                  <MinusCircleOutlined
                    style={{ color: "red" }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add Event
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
          <div>
            <Button style={{ marginRight: "2vw" }} type="primary" danger onClick={() => { form.resetFields() }}>Clear Settings</Button>
          </div>
          <div>
            <Button loading={props.loadingStatus} type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: "1.5vh" }}>Update Settings</Button>
          </div>

        </div>
      </Form.Item>

    </Form>
  )
}

const menu = (handleMenuSelect) => {
  return (
    <Menu onClick={handleMenuSelect}>
      <Menu.Item key="Settings">
        <span><SettingFilled /> Settings</span>
      </Menu.Item>
      <Menu.Item key="Share">
        <span><ShareAltOutlined /> Share Countdown</span>
      </Menu.Item>
    </Menu>
  );
}

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsModal: false,
      shareModal: false
    };
  }

  handleMenuSelect = (e) => {
    if (e.key === "Settings") this.setState({ settingsModal: true })
    else this.setState({ shareModal: true })
  }

  render() {
    return (
      <div>
        <Dropdown overlay={() => menu(this.handleMenuSelect.bind(this))} placement="topLeft" arrow trigger={["click"]}>
          <div style={{ position: "absolute", right: "8px", bottom: "20px", zIndex: 1 }}>
            <Button style={{ boxShadow: "0px 0px 5px 1px #595959" }} type="primary" icon={<EllipsisOutlined />} size="large">Settings &amp; More</Button>
          </div>
        </Dropdown>

        <Modal style={{ textAlign: "center" }} visible={this.state.settingsModal} onCancel={() => { this.setState({ settingsModal: false }) }} footer={null}>
          <h1>Countdown Settings</h1>
          <SettingsForm setState={this.setState.bind(this)} />
        </Modal>
        <Modal visible={this.state.shareModal} onCancel={() => { this.setState({ shareModal: false }) }} footer={null}>
          Share Modal
        </Modal>
      </div>
    );
  }
}

export default Settings;
