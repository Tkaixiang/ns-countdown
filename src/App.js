import React from 'react';
import './App.css';
import { Layout, Button, Row, Col, Divider, Progress } from 'antd';
import { ClockCircleTwoTone, SettingTwoTone } from '@ant-design/icons';

const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: "5 days",
      event: "Book Out"
    };
  }

  componentDidMount() {
    let timeLeft = 300000

  }

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Layout className="site-layout">
          <Content style={{ margin: "16px" }}>

            <Row gutter={16}>
              <Col span={24} style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", border: "5px solid transparent", borderRadius: "20px" }}>
                  <h1 style={{ fontSize: "125%" }}><span style={{ color: "#096dd9", fontSize: "175%" }}>{this.state.timeLeft}</span> <br />To<br /> <span style={{ fontWeight: "bolder", color: "#faad14", fontSize: "200%" }}><u>{this.state.event}</u></span></h1>
                  <Progress
                    strokeColor={{
                      from: '#108ee9',
                      to: '#87d068',
                    }}
                    percent={99.9}
                    status="active"
                    style={{ maxWidth: "45ch" }}
                  />
                </div>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12} style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", border: "5px solid transparent", borderRadius: "20px" }}>
                  <h1 style={{ fontSize: "125%" }}><span style={{ color: "#096dd9", fontSize: "175%" }}>{this.state.timeLeft}</span> <br />To<br /> <span style={{ fontWeight: "bolder", color: "#faad14", fontSize: "200%" }}><u>POP</u></span></h1>
                  <Progress
                    type="circle"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    percent={90}
                    style={{marginLeft: "2ch"}}
                  />
                </div>
              </Col>
              <Col span={12} style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", border: "5px solid transparent", borderRadius: "20px" }}>
                  <h1 style={{ fontSize: "125%" }}><span style={{ color: "#096dd9", fontSize: "175%" }}>{this.state.timeLeft}</span> <br />To<br /> <span style={{ fontWeight: "bolder", color: "#faad14", fontSize: "200%" }}><u>ORD</u></span></h1>
                  <Progress
                    type="circle"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    percent={90}
                    style={{marginLeft: "2ch"}}
                  />
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
