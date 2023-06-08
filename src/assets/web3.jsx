import { Component, Children } from "react";
import Web3 from "web3";


const MyContractABI = [
  {
    "inputs": [],
    "name": "add",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


const MyContractAddress = "0x63a0598eb6B9cBAc03Da22B10518C5Ca90d8F8b6"

class ContractComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractInstance: null
    };
  }

  // 初始化合约实例化对象
  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(MyContractABI, MyContractAddress);
    this.setState({ contractInstance: contract });
  }

  render() {
    const { children } = this.props;
    const { contractInstance } = this.state;

    // 如果 children 不是一个函数，返回 null
    if (typeof children !== "function") {
      return null;
    }

    // 调用children函数并传递contractInstance作为参数
    return Children.only(children(contractInstance));
  }
}

export default ContractComponent;
