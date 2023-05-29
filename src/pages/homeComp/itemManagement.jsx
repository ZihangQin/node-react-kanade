import React from "react";
import './DynamicTable.css';
import { Pagination } from 'antd';
import axios from 'axios';

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TestLists: [],
            TitlePages: 0,
            page: 1, // 初始化当前页数为1
            loading: false, // 添加一个loading状态用于展示数据加载中的提示
            error: null // 添加一个error状态用于展示请求数据时出现的错误信息
        };
    }

    async componentDidMount() {
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true

        try {
            const response = await axios.get('http://127.0.0.1:8080/api/browse/testList?page='+this.state.page);
            const { TestLists, TitlePages } = response.data.Data;
            this.setState({ TestLists, TitlePages, loading: false }); // 请求数据成功后将loading状态设置为false
        } catch(err) {
            console.log('请求数据出错', err);
            this.setState({ error: '请求数据出错', loading: false }); // 请求数据出现错误时将error状态设置为请求数据出错的信息并将loading状态设置为false
        }
    }

    handleChangePage = async (page) => { // 分页组件的onChange回调函数
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true

        try {
            const response = await axios.get('http://127.0.0.1:8080/api/browse/testList?page='+page);
            const { TestLists, TitlePages } = response.data.Data;
            this.setState({ TestLists, TitlePages, page, loading: false, error: null }); // 更新state中的data、totalPage和page属性并将loading状态设置为false，清除error状态
        } catch(err) {
            console.log('请求数据出错', err);
            this.setState({ error: '请求数据出错', loading: false }); // 请求数据出现错误时将error状态设置为请求数据出错的信息并将loading状态设置为false
        }
    }

    render() {
        const { TestLists, TitlePages, page, loading, error } = this.state;

        // 如果发生了错误，则展示错误信息
        if (error) {
          return <div>{error}</div>;
        }

        return (
            <>
                <div className="search_top">
                    <input type="text"></input>
                    &nbsp; &nbsp; &nbsp;
                    <input type="text"></input>
                    &nbsp; &nbsp; &nbsp;
                    <input type="text"></input>
                    &nbsp; &nbsp; &nbsp;
                    <input type="submit" value={"查询"}></input>
                    &nbsp; &nbsp; &nbsp;
                    <input type="submit" value={"新增"}></input>
                </div>
                <div className="data_middle">
                    {loading ? (
                        <div>数据加载中...</div> // 如果loading状态为true，则展示数据加载中的提示信息
                    ) : (
                        <>
                            {TestLists.length > 0 ?( // 如果有数据则展示表格
                                <table>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>题目</th>
                                        <th>班级</th>
                                        <th>分值</th>
                                        <th>题目类型</th>
                                        <th>难度系数</th>
                                        <th>出题人</th>
                                        <th>答案</th>
                                        <th>时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TestLists.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.class}</td>
                                            <td>{item.score}</td>
                                            <td>{item.title_type}</td>
                                            <td>{item.difficulty}</td>
                                            <td>{item.questionsSetter}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.updateAt}</td>
                                            <td>
                                                <button type="submit">修改</button>
                                                &nbsp; &nbsp; &nbsp;
                                                <button type="submit">删除</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ):(
                                <>
                                <table>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>题目</th>
                                        <th>班级</th>
                                        <th>分值</th>
                                        <th>题目类型</th>
                                        <th>难度系数</th>
                                        <th>出题人</th>
                                        <th>答案</th>
                                        <th>时间</th>
                                        <th>操作</th>

                                    </tr>
                                </thead>
                                </table>
                                <div>暂无数据</div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="paging_button">
                    <div><span>批量删除</span></div>
                    <Pagination defaultCurrent={1} current={page} total={TitlePages*10} onChange={this.handleChangePage} />,
                </div>
            </>
        )
    }
}
