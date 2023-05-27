import React from "react";
import "./main.css"
import cookie from 'react-cookies'
import { Menu } from 'antd'
import axios from 'axios';
import { Icon } from '@ant-design/compatible'
import {
  Option1, Option2, Option3, Option5, Option6, Option7,
  Option9,
} from '../option/options'

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  state = {
    current: '1',
    contentView: <h1>欢迎进入考试管理系统</h1>,
    userInfoName: "",
    userInfoCalculus: ""
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if (e.key === '1') {
      this.setState({ contentView: e.key === '1' ? <Option1 /> : null });
    } else if (e.key === '2') {
      this.setState({ contentView: e.key === '2' ? <Option2 /> : null });
    } else if (e.key === '3') {
      this.setState({ contentView: e.key === '3' ? <Option3 /> : null });
    } else if (e.key === '5') {
      this.setState({ contentView: e.key === '5' ? <Option5 /> : null });
    } else if (e.key === '6') {
      this.setState({ contentView: e.key === '6' ? <Option6 /> : null });
    } else if (e.key === '7') {
      this.setState({ contentView: e.key === '7' ? <Option7 /> : null });
    } else if (e.key === '9') {
      this.setState({ contentView: e.key === '9' ? <Option9 /> : null });
    }
  };


  componentDidMount() {
    const token = cookie.load('token');
    if (!token) {
      window.location.href = "/login";
    } else {
      axios.get('http://127.0.0.1:8080/api/browse/user?authorization=' + token.Data)
        .then(response => {
          const { username, calculus } = response.data.Data;
          this.setState({
            userInfoName: username,
            userInfoCalculus: calculus,
          });
        })
        .catch(error => {
          console.error(`请求失败：${error}`);
        });
    }
  }


  render() {
    return (
      <>
        <div className="top_menu">
          <span>考试管理系统</span>
          <div className="userInfo">
            <span>用户名：{this.state.userInfoName}</span>
            <span>积分：{this.state.userInfoCalculus}</span>
          </div>
        </div>
        <div className="MenuList" style={{ height: "90vh" }}>

          <div className="Menu">
            <Menu
              onClick={this.handleClick}
              style={{ width: 240 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>系统管理</span></span>}>
                <Menu.Item key="1">查看当前账号信息</Menu.Item>
                <Menu.Item key="2">修改密码</Menu.Item>
                <Menu.Item key="3">关于</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>考试管理</span></span>}>
                <Menu.Item key="5">试题管理</Menu.Item>
                <Menu.Item key="6">科目管理</Menu.Item>
                <Menu.Item key="7">试卷管理</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>班级管理</span></span>}>
                <Menu.Item key="9">查看班级</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="priView">
            {this.state.contentView}
          </div>
        </div>
      </>
    );
  }
}

export default Sider;