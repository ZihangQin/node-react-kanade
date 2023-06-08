import React from "react";
import TopTitle from "../../utils/title";
import ContractComponent from "../../assets/web3";




export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.contractRef = React.createRef();
    }

    async componentDidMount() {
        // 获取合约实例化对象
        const contractInstance = this.contractRef.current;
        // 调用合约方法
        const result = await contractInstance.methods.add().call();
        // 更新状态
        this.setState({ value: result });
    }


    render() {
        return (
            <>
                <TopTitle title={"系统设置"} className={"setting_title"} />
                <div>
                    {/* 通过ref引用获取合约实例化对象 */}
                    <ContractComponent ref={this.contractRef} />
                    <div>调用结果：{this.state.value}</div>
                </div>
            </>
        );
    }
}
