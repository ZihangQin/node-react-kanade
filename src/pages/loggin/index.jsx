import React from "react";
import { Spin } from 'antd'
import './loggin.css'
import TopTitle from "../../utils/title";
export default class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LogLists: [],
            loading: false, // 添加一个loading状态用于展示数据加载中的提示

        }
    }
    render() {
        const { loading, LogLists } = this.state;
        console.log(LogLists)

        return (
            <>
            <TopTitle title="日志管理" className="custom-class-name" />

                {/* 中部数据展示框 */}
                <div className={`data_middle`}>
                    {loading ? (
                        <Spin /> // 如果loading状态为true，则展示数据加载中的提示信息
                    ) : (
                        <>
                            {LogLists.length > 0  ? ( // 如果有数据则展示表格
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
                                                <td>{item.id}</td> 
                                                <td>{item.title}</td>
                                                <td>{item.class}</td>
                                                <td>{item.score}</td>
                                                <td>{item.title_type}</td>
                                                <td>{item.difficulty}</td>
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

            </>
        )
    }
}