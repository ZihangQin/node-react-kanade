import { Form, Button, Input } from "antd";
// import Index from "../main/index"
import "./login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies'

const Inner = () => {
    return (
        <div className="container">
            <div className="inner">
                <span>i</span>
                <h1>登录</h1>
                <p>这是个登录功能，这张卡片会给出某种提示</p>
            </div>
        </div>
    )
}

const Back = () => {
    return (
        <div className="background">
            <div className="shape" />
            <div className="shape" />
        </div>
    )
}

const Drop = () => {
    return (
        <>
            <div className="drop"></div>
            <div className="wave"></div>
        </>
    )
}


//TODO: 发送登录请求的时候无法正常获取值
function Login() {
    const onFinish = (values) => {
        console.log(values)
        if (!values.userName && !values.password) {
            alert("账号密码不能为空");
            return;
        } else {
            axios.post('http://127.0.0.1:8080/api/account/login', {
                username: values.userName,
                password: values.password
            })
                .then(response => {
                    console.log("登录成功")
                    alert("登录成功");
                    // 存数据时设置失效时间
                    const oneDay = new Date(new Date().getTime() + 24 * 3600 * 1000);
                    // 设置失效日期一天
                    cookie.save("token", response.data, { expires: oneDay });
                    window.location.href = "/index"
                })
                .catch(error => {
                    console.log(error.response.data);
                    alert(error.response.data.Msg)
                })
        }
    }


    return (
        <div className="priLoginDiv">
            <title>登录</title>
            <Inner />
            <Back />
            <Drop />
            <Form
                name="form"
                className="myForm"
                onFinish={onFinish}
                id="form"
            >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名或邮箱',
                        },
                    ]}
                >
                    <div>
                        <h3>密码登录</h3>
                        <label>用户名：</label>
                        <Input
                            type="text" name="userName" placeholder="请输入用户名或邮箱" id="userName" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <div>
                        <label>密码：</label>
                        <Input
                            type="password" name="password" placeholder="密码" id="password" />
                    </div>
                </Form.Item>

                <Form.Item>
                    {/* 
                          * TODO: 2023.05.11 
                          * @author: qin 
                          * 在router分发过程中，指定路由的地方无需添加BrowseRouter
                          * */}
                    {/* <BrowserRouter> */}
                    {/* <Link to="/index"> */}
                    <Button type="primary" className="buttonLogin" htmlType="submit">
                        登录
                    </Button>
                    {/* </Link> */}
                    <Link to="/register" className="link-register">
                        注册账号
                    </Link>
                    {/* </BrowserRouter> */}
                </Form.Item>

            </Form>
        </div>
    )
};

export default Login;