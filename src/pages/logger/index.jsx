import React from "react";
import { Spin, Pagination } from 'antd'
import './logger.css'
import TopTitle from "../../utils/title";
import axios from "axios";

export default class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LogLists: [],
            LogPages: 0,
            loading: false, // 添加一个loading状态用于展示数据加载中的提示
            results: "",
            page: 1, // 初始化当前页数为1

        }
    }

    handleChangePage = async (page) => { // 分页组件的onChange回调函数
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true
        console.log(page)
        await axios.get('http://127.0.0.1:8080/api/logger/getLoggerList?page=' + page)
            .then(require => {
                const { loggers, totle_page } = require.data.Data;
                this.setState({ LogLists: loggers, LogPages: totle_page, page, loading: false }, () => {
                    // 当第一次 setState 执行完后才会执行此回调函数
                    const { contract, account } = this.props;
                    contract.methods.getLoggers(account, "qin").call()
                        .then(result => {
                            // 在这里执行其他需要等待异步操作完成后才能进行的代码
                            if (result.length <= 0) {
                                this.setState(prevState => ({
                                    LogLists: prevState.LogLists.map(item => Object.assign({}, item, { flag: "false" }))
                                }));
                            } else {
                                console.log(result[0]["OperatorHash"]);
                                console.log(typeof result[0]["OperatorHash"]);
                                this.setState({ results: result[0]["OperatorHash"] });
                                // 先将所有日志对象的 flag 属性设为 false
                                this.setState(prevState => ({
                                    LogLists: prevState.LogLists.map(item => ({ ...item, flag: "false" }))
                                }));
                                //首先遍历合约返回值
                                for (let i = 0; i < result.length; i++) {
                                    const contractHash = result[i]["OperatorHash"]
                                    //再去遍历数据库中的hash值
                                    // 遍历合约返回值
                                    for (let i = 0; i < result.length; i++) {
                                        const contractHash = result[i]["OperatorHash"]
                                        // 再去遍历数据库中的 hash 值
                                        for (let j = 0; j < this.state.LogLists.length; j++) {
                                            const databaseHash = this.state.LogLists[j].hashValue

                                            // 查看是否有匹配的值
                                            if (contractHash === databaseHash) {
                                                // 找到匹配项后，将对应 item 对象的 flag 属性设为 true
                                                this.setState(prevState => ({
                                                    LogLists: prevState.LogLists.map((item, index) =>
                                                        index === j ? { ...item, flag: "true" } : item
                                                    )
                                                }));
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
            })
            .catch(error => {
                console.log(error)
            });

    }

    async componentDidMount() {
        await axios.get('http://127.0.0.1:8080/api/logger/getLoggerList?page=' + this.state.page)
            .then(require => {
                const { loggers, totle_page } = require.data.Data;
                this.setState({ LogLists: loggers, LogPages: totle_page, loading: false }, () => {
                    // 当第一次 setState 执行完后才会执行此回调函数
                    const { contract, account } = this.props;
                    contract.methods.getLoggers(account, "qin").call()
                        .then(result => {
                            // 在这里执行其他需要等待异步操作完成后才能进行的代码
                            if (result.length <= 0) {
                                this.setState(prevState => ({
                                    LogLists: prevState.LogLists.map(item => Object.assign({}, item, { flag: "false" }))
                                }));
                            } else {
                                console.log(result[0]["OperatorHash"]);
                                console.log(typeof result[0]["OperatorHash"]);
                                this.setState({ results: result[0]["OperatorHash"] });
                                // 先将所有日志对象的 flag 属性设为 false
                                this.setState(prevState => ({
                                    LogLists: prevState.LogLists.map(item => ({ ...item, flag: "false" }))
                                }));
                                //首先遍历合约返回值
                                for (let i = 0; i < result.length; i++) {
                                    const contractHash = result[i]["OperatorHash"]
                                    //再去遍历数据库中的hash值
                                    // 遍历合约返回值
                                    for (let i = 0; i < result.length; i++) {
                                        const contractHash = result[i]["OperatorHash"]
                                        // 再去遍历数据库中的 hash 值
                                        for (let j = 0; j < this.state.LogLists.length; j++) {
                                            const databaseHash = this.state.LogLists[j].hashValue

                                            // 查看是否有匹配的值
                                            if (contractHash === databaseHash) {
                                                // 找到匹配项后，将对应 item 对象的 flag 属性设为 true
                                                this.setState(prevState => ({
                                                    LogLists: prevState.LogLists.map((item, index) =>
                                                        index === j ? { ...item, flag: "true" } : item
                                                    )
                                                }));
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
            })
            .catch(error => {
                console.log(error)
            });

    }

    handleOnClickTitle = () => {
        this.componentDidMount();
    }


    render() {
        const { loading, LogLists, page, LogPages } = this.state;
        console.log("====", LogLists, page, LogPages)
        // console.log("---",LogLists[0].flag)

        return (
            <>
                <div onClick={this.handleOnClickTitle}>
                    <TopTitle title="日志管理" className="custom-class-name" />
                </div>
                {/* 中部数据展示框 */}
                <div className={`data_middle`}>
                    {loading ? (
                        <Spin /> // 如果loading状态为true，则展示数据加载中的提示信息
                    ) : (
                        <>
                            {LogLists.length > 0 ? ( // 如果有数据则展示表格
                                <table>
                                    <thead>
                                        <tr>
                                            <th>日期</th>
                                            <th>用户名</th>
                                            <th>操作</th>
                                            <th>时间</th>
                                            <th>hash值</th>
                                            <th>真实性</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LogLists.map((item) => (

                                            <tr key={item.id}>
                                                <td>{item.date}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.operate}</td>
                                                <td>{item.time}</td>
                                                <td>{item.hashValue}</td>
                                                <td>{item.flag}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>日期</th>
                                                <th>用户名</th>
                                                <th>操作</th>
                                                <th>时间</th>
                                                <th>hash值</th>
                                                <th>真实性</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><div>暂无数据</div></td>
                                                <td><div>暂无数据</div></td>
                                                <td><div>暂无数据</div></td>
                                                <td><div>暂无数据</div></td>
                                                <td><div>暂无数据</div></td>
                                                <td><div>暂无数据</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div style={{ marginLeft: "650px" }}>
                    <Pagination defaultCurrent={1} current={page} total={LogPages * 10} onChange={this.handleChangePage} />,
                </div>

            </>
        )
    }
}