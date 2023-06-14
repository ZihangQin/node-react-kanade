import React from "react";



export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        };
    }

    async componentDidMount() {
        const { contract } = this.props; // 从 props 中获取 contract 属性
        const result = await contract.methods.add().call(); // 调用合约方法
        this.setState({ result }); // 将结果保存到组件状态中
    }

    render() {
        const { result } = this.state;
        return (
            <>
                <h1>web3调用测试</h1>
                <span style={{backgroundColor:"black"}}>{result}</span>
            </>
        )
    }
}
