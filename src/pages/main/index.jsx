import React from "react";
import "./main.css"
import cookie from 'react-cookies'
import { Menu } from 'antd'
import axios from 'axios';
import { Icon } from '@ant-design/compatible'
import Options from '../option/options'
import DynamicTable from "../homeComp/itemManagement";
import Log from "../logger";
import Settings from "../setting";
import Web3 from "web3";
import {MyContractABI, MyContractAddress} from '../../utils/config'




const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      contentView: <Options options={[{ id: 0, bgColor: '#f5f5f5', content: <h1 style={{ color: "black" }}>欢迎进入考试管理系统</h1> }]} />,
      userInfoName: "",
      userInfoCalculus: "",
      key: 0, // 将key属性抽离到state中
      account: "",
      network: "",
      // my_contract: null, // 初始化为智能合约对象
    }
    this.contractComponent = null;
    this.my_contract = null;
    this.accounts = [];
  }



  handleClick = e => {
    this.setState({
      current: e.key,
    });
    if (e.key === '1') {
      this.setState({ contentView: e.key === '1' ? <Options options={[{ id: e.key, bgColor: '#f5f5f5', content: <Settings contract={this.my_contract}/> }]} /> : null });
    } else if (e.key === '2') {
      this.setState({ contentView: e.key === '2' ? <Options options={[{ id: e.key, bgColor: 'red', content: 'Option 2' }]} /> : null });
    } else if (e.key === '3') {
      this.setState({ contentView: e.key === '3' ? <Options options={[{ id: e.key, bgColor: 'red', content: 'Option 3' }]} /> : null })
    } else if (e.key === '5') {
      this.setState({
        contentView: e.key === '5' ? <Options options={[{ id: e.key, bgColor: '#f5f5f5', content: <DynamicTable key={this.state.key}
        account={this.accounts} contract={this.my_contract}/> }]}
        /> : null
      });
    } else if (e.key === '6') {
      this.setState({ contentView: e.key === '6' ? <Options options={[{ id: e.key, bgColor: 'red', content: 'Option 6' }]} /> : null })
    } else if (e.key === '7') {
      this.setState({ contentView: e.key === '7' ? <Options options={[{ id: e.key, bgColor: 'red', content: 'Option 7' }]} /> : null })
    } else if (e.key === '9') {
      this.setState({ contentView: e.key === '9' ? <Options options={[{ id: e.key, bgColor: 'red', content: 'Option 9' }]} /> : null })
    } else if (e.key === '10') {
      this.setState({ contentView: e.key === '10' ? <Options options={[{ id: e.key, bgColor: '#f5f5f5', content: 
      <Log account={this.accounts} contract={this.my_contract}/> }]} /> : null })
    }
  };


  componentDidMount() {
    this.loadData()

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

  loadData = () => {
    console.log("在组件挂起的时候被调用了")
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = web3.eth.net.getNetworkType();
    this.setState({ network })

    // 获取账户
    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.error(error)
      } else {
        this.setState({ account: accounts[0] })
        this.accounts = accounts[0]
      }
    })
    //实例化合约
    const my_contract = new web3.eth.Contract(MyContractABI, MyContractAddress)
    this.setState({ my_contract: my_contract });
    this.my_contract = my_contract;
    console.log("my_account: ", my_contract)
  }

  handleOnClickTopMenu = () => {
    window.location.href = "/index"
  }


  render() {
    return (
      <>
        <div className="top_menu">
          <span onClick={this.handleOnClickTopMenu}>考试管理系统</span>
          <div className="userInfo">
            <span>用户名：{this.state.userInfoName},</span>
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
              <SubMenu key="sub1" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                <Menu.Item key="1">查看当前账号信息</Menu.Item>
                <Menu.Item key="2">修改密码</Menu.Item>
                <Menu.Item key="3">关于</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>考试管理</span></span>}>
                <Menu.Item key="5">试题管理</Menu.Item>
                <Menu.Item key="6">科目管理</Menu.Item>
                <Menu.Item key="7">试卷管理</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="home" /><span>班级管理</span></span>}>
                <Menu.Item key="9">查看班级</Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" title={<span><Icon type="login" /><span>日志管理页面</span></span>}>
                <Menu.Item key="10">查看日志</Menu.Item>
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