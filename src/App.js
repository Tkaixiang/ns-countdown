import React from 'react';
import './App.css';
import Settings from './Settings.js';
import moment from 'moment';
import { Layout, Button, Row, Col, Divider, Progress } from 'antd';
import { ClockCircleTwoTone, SettingTwoTone } from '@ant-design/icons';

const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: "5 days",
      event: "Book Out",
      parsedData: {},
      POPTime: 0,
      ORDTime: 0
    };
  }

  componentDidMount() {
    this.loadDetails()
  }

  calculateTimeRemaining = (time) => {
    let fixedTime = parseInt(time)
    let seconds = fixedTime % 60
    let minutes = Math.ceil(fixedTime / 60)
    let hours = 0
    let days = 0
    let months = 0
    let years = 0
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60)
      minutes = minutes - hours * 60

      if (hours >= 24) {
        days = Math.floor(hours / 24)
        hours = hours - days * 24

        if (days >= 30) {
          months = Math.floor(days / 30)
          days = days - months * 30

          if (months >= 12) {
            years = Math.floor(months / 12)
            months = months - years * 12
          }
        }
      }
    }
    let finalTime = ""
    if (seconds !== 0) {
      finalTime = parseInt(seconds) + " seconds " + finalTime
    }
    if (minutes !== 0) {
      finalTime = minutes.toString() + " minutes " + finalTime
    }
    if (hours !== 0) {
      finalTime = hours.toString() + " hours " + finalTime
    }
    if (days !== 0) {
      finalTime = days.toString() + " days " + finalTime
    }
    if (months !== 0) {
      finalTime = months.toString() + " months " + finalTime
    }
    if (years !== 0) {
      finalTime = years.toString() + " years " + finalTime
    }
    return finalTime
  }

  loadDetails = async () => {
    let data = localStorage.getItem('countDownSettings')

    if (typeof data === "string") {
      data = JSON.parse(data)

      // Get POP time remaining 
      const POPTime = Math.abs(new Date() - new Date(data.POPDate)) / 1000
      // Get ORD time remaining
      const ORDTime = Math.abs(new Date() - new Date(data.ORDDate)) / 1000

      await this.setState({POPTime: POPTime, ORDTime: ORDTime})
      setInterval(this.updateTimings, 1000)

    }

  }

  updateTimings = () => {
    let parsedData = {
      POPDate: "",
      POPProgress: 0,
      ORDProgress: 0,
      ORDDate: "",
      events: []
    }

    parsedData.POPDate =  this.calculateTimeRemaining(this.state.POPTime)
    parsedData.ORDDate =  this.calculateTimeRemaining(this.state.ORDTime)
    parsedData.POPProgress = (new Date() - new Date(this.state.POPTime)) * 100
    parsedData.ORDProgress = (new Date(this.state.ORDTime) / new Date()) * 100
    //console.log(parsedData)
    this.setState({parsedData: parsedData, POPTime: this.state.POPTime-1, ORDTime: this.state.ORDTime-1})
  }



  render() {
    return (
      <Layout style={{ height: "100vh" }} className="site-layout">
        <Content style={{ margin: "16px" }}>
          <h1>NS Countdown</h1>
          <Divider />
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
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", border: "5px solid transparent", borderRadius: "20px" }}>
                <h1 style={{ fontSize: "125%" }}><span style={{ color: "#096dd9", fontSize: "175%" }}>{this.state.parsedData.POPDate}</span> <br />To<br /> <span style={{ fontWeight: "bolder", color: "#faad14", fontSize: "200%" }}><u>POP</u></span></h1>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={this.state.parsedData.POPProgress}
                  style={{ marginLeft: "2ch" }}
                />
              </div>
            </Col>
            <Col span={12} style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", border: "5px solid transparent", borderRadius: "20px" }}>
                <h1 style={{ fontSize: "125%" }}><span style={{ color: "#096dd9", fontSize: "175%" }}>{this.state.parsedData.ORDDate}</span> <br />To<br /> <span style={{ fontWeight: "bolder", color: "#faad14", fontSize: "200%" }}><u>ORD</u></span></h1>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={this.state.parsedData.ORDProgress}
                  style={{ marginLeft: "2ch" }}
                />
              </div>
            </Col>
          </Row>
        </Content>
        <Settings />
      </Layout>
    );
  }
}

export default App;
