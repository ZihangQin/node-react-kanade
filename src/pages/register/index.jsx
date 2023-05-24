// import { Inner, Back } from '../login/index'
import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import './register.css'
import axios from "axios";


const Inner = () => {
    return (
        <div className="container">
            <div className="inner">
                <span>i</span>
                <h1>注册</h1>
                <p>这是个注册功能，请正确填写。携带*号的是必填项，不带*号的可选填</p>
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

function Register() {
    const onFinish = (values) => {
        console.log(values)
        if (!values.userName || !values.password || !values.email) {
            alert("账号密码不能为空");
            return;
        } else {
            axios.post('http://127.0.0.1:8080/api/account/register', {
                username: values.userName,
                password: values.password,
                phone: values.phone,
                email: values.email
            })
                .then(response => {
                    console.log("注册成功")
                    alert("注册成功");
                    window.location.href = "/login"
                })
                .catch(error => {
                    console.log(error.response.data);
                    alert(error.response.data.Msg)
                })
        }

    }


    return (
        <div className="priRegisterDiv">
            <title>注册账号</title>
            <Inner />
            <Back />
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
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <div>
                        <h3>账号注册</h3>
                        <label>*用户名：</label>
                        <Input
                            type="text" name="userName" placeholder="请输入用户名" id="userName" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱',
                        },
                    ]}
                >
                    <div>
                        <label>*邮箱：</label>
                        <Input
                            type="text" name="email" placeholder="请输入邮箱" id="email" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="phone"
                >
                    <div>
                        <label>手机号：</label>
                        <Input
                            type="text" name="phone" placeholder="请输入手机号" id="phone" />
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
                        <label>*密码：</label>
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

                    <Button type="primary" className="buttonLogin" htmlType="submit">
                        注册账号
                    </Button>
                    <br />
                        <Link to="/login" className="link-login">
                            已有账号去登录
                        </Link>
                </Form.Item>

            </Form>
        </div>
    )

}


export default Register;