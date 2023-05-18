import React from "react";
import "./main.css"
import cookie from 'react-cookies'
import { Menu } from 'antd'
import { Icon } from '@ant-design/compatible'
import { Option1, Option2, Option3, Option4, Option5, Option6, Option7, Option8,
         Option9, Option10, Option11, Option12} from '../option/options'

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  state = {
    current: '1',
    contentView: null
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key === '1'){
      this.setState({contentView: e.key === '1' ? <Option1 /> : null});
    }else if(e.key === '2'){
      this.setState({contentView: e.key === '2' ? <Option2 /> : null});
    }else if(e.key === '3'){
      this.setState({contentView: e.key === '3' ? <Option3 /> : null});
    }else if(e.key === '4'){
      this.setState({contentView: e.key === '4' ? <Option4 /> : null});
    }else if(e.key === '5'){
      this.setState({contentView: e.key === '5' ? <Option5 /> : null});
    }else if(e.key === '6'){
      this.setState({contentView: e.key === '6' ? <Option6 /> : null});
    }else if(e.key === '7'){
      this.setState({contentView: e.key === '7' ? <Option7 /> : null});
    }else if(e.key === '8'){
      this.setState({contentView: e.key === '8' ? <Option8 /> : null});
    }else if(e.key === '9'){
      this.setState({contentView: e.key === '9' ? <Option9 /> : null});
    }else if(e.key === '10'){
      this.setState({contentView: e.key === '10' ? <Option10 /> : null});
    }else if(e.key === '11'){
      this.setState({contentView: e.key === '11' ? <Option11 /> : null});
    }else if(e.key === '12'){
      this.setState({contentView: e.key === '12' ? <Option12 /> : null});
    }

  };

  

  render() {
     // 取
    const token = cookie.load('token');
    if (!token) {
      window.location.href = "/login";
    } else {
      console.log(token.Data);
      // 

      return (
        // <>
          <div className="MenuList" style={{ height: "104vh" }}>
          <div className="Menu">
            <Menu
              onClick={this.handleClick}
              style={{ width: 240 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                <Menu.Item key="1">选项1</Menu.Item>
                <Menu.Item key="2">选项2</Menu.Item>
                <Menu.Item key="3">选项3</Menu.Item>
                <Menu.Item key="4">选项4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                <Menu.Item key="5">选项5</Menu.Item>
                <Menu.Item key="6">选项6</Menu.Item>
                <SubMenu key="sub3" title="三级导航">
                  <Menu.Item key="7">选项7</Menu.Item>
                  <Menu.Item key="8">选项8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
                <Menu.Item key="9">选项9</Menu.Item>
                <Menu.Item key="10">选项10</Menu.Item>
                <Menu.Item key="11">选项11</Menu.Item>
                <Menu.Item key="12">选项12</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="priView">
            {this.state.contentView}
          </div>
        </div>
      );
    }
  }
}

export default Sider;