import React from "react";
import './dynamicTable.css';
import { Pagination, Modal, Popconfirm, message, Form, Input, Spin } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies'
import { Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TestLists: [],
            TitlePages: 0,
            page: 1, // 初始化当前页数为1
            loading: false, // 添加一个loading状态用于展示数据加载中的提示
            error: null, // 添加一个error状态用于展示请求数据时出现的错误信息
            checked: {}, // 存储哪些复选框被选中了
            visible: false, // 控制Modal显示与隐藏
            addContent: '', // 存储输入的新增内容
            isListPage: true, // 添加 isListPage 变量，默认为 true
            form: {},    //用于保存新增弹框中输入值
            editForm: {}, // 编辑试题表单数据
            editVisible: false
        };
        this.inputRef = React.createRef();
    }

    handleEdit = (item) => {// 将要编辑的试题信息存入editForm中
        this.setState({
            editForm: {
                id: item.id,
                type: item.title_type,
                grade: item.class,
                content: item.title,
                difficulty: item.difficulty,
                score: item.score,
                answer: item.answer,
                updateAt: item.updateAt
            },
            editVisible: true
        });
    }

    async componentDidMount() {//首次加载改组件的回调
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true
        const token = cookie.load('token');
        try {
            const response = await axios.get('http://127.0.0.1:8080/api/browse/testList?page=' + this.state.page + '&token=' + token.Data);
            const { TestLists, TitlePages } = response.data.Data;
            this.setState({ TestLists, TitlePages, loading: false }); // 请求数据成功后将loading状态设置为false
        } catch (err) {
            console.log('请求数据出错', err);
            this.setState({ error: '请求数据出错', loading: false }); // 请求数据出现错误时将error状态设置为请求数据出错的信息并将loading状态设置为false
        }
    }

    handleChangePage = async (page) => { // 分页组件的onChange回调函数
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true
        const token = cookie.load('token');
        try {
            const response = await axios.get('http://127.0.0.1:8080/api/browse/testList?page=' + page + '&token=' + token.Data);
            const { TestLists, TitlePages } = response.data.Data;
            this.setState({ TestLists, TitlePages, page, loading: false, error: null }); // 更新state中的data、totalPage和page属性并将loading状态设置为false，清除error状态
        } catch (err) {
            console.log('请求数据出错', err);
            this.setState({ error: '请求数据出错', loading: false }); // 请求数据出现错误时将error状态设置为请求数据出错的信息并将loading状态设置为false
        }
    }

    handleSelectAll = (e) => {//全选表格内的复选框
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="myCheckbox"]'); // 获取所有复选框的DOM节点列表
        const checked = {};
        checkboxes.forEach((checkbox) => {
            checkbox.checked = e.target.checked; // 遍历所有DOM节点并将其checked属性设置为全选复选框的选中状态
            const { id } = checkbox;
            if (checkbox.checked) {
                checked[checkbox.getAttribute('id')] = id// 将每个复选框的选中状态存储到checked对象中
            } else {
                delete checked[checkbox.getAttribute('id')] // 将每个复选框的选中状态存储到checked对象中
            }
        });
        this.setState({ checked }); // 设置state中的checked属性
    }

    // 将复选框的选中状态存储到state中的checked属性中
    handleCheckboxChange = (e) => {
        const { id } = e.target;
        const { checked: oldChecked } = this.state;
        let newChecked;
        if (oldChecked[id]) {
            // 如果当前复选框之前被选中，则取消选中并从checked对象中删除该条数据
            delete oldChecked[id];
            e.target.checked = "";
            newChecked = { ...oldChecked };
        } else {
            // 否则，将当前复选框的选中状态存储到checked对象中
            newChecked = { ...oldChecked, [id]: id };
        }
        this.setState({ checked: newChecked });
    }

    getCheckTrue = () => {//批量删除
        if (Object.keys(this.state.checked).length === 0) {
            alert("请选择要批量删除的数据")
            return
        }
        //TODO:
        //此处后端请求批量删除
        axios.post("http://127.0.0.1:8080/api/browse/deleteTests", {
            strList: this.state.checked,
            token: this.token
        })
            .then(require => {
                console.log(require)
                message.success("批量删除成功")
                this.refreshComponent(); // 请求成功后重新加载组件
            })
            .catch(error => {
                console.error(`请求失败：${error}`);
            });
    }

    refreshComponent = () => {//返回第一页的回调
        this.setState({ loading: true }); // 开始请求数据前将loading状态设置为true
        const token = cookie.load('token');
        try {
            axios.get(
                'http://127.0.0.1:8080/api/browse/testList?page=' + 1 + '&token=' + token.Data)
                .then(require => {
                    const { TestLists, TitlePages } = require.data.Data;
                    this.setState({
                        page: 1,
                        TestLists,
                        TitlePages,
                        loading: false, // 设置loading为false表示请求结束
                        checked: {} // 清空选中状态
                    });
                })

        } catch (err) {
            console.log('请求数据出错', err);
            this.setState({ error: '请求数据出错', loading: false });
        }
    }

    handleAddClick = () => {
        this.setState({ visible: true });
    }

    handleChangeAddContent = (key, value) => {//获取弹框内的输入框中的值
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [key]: value
            }
        }));
    }

    handleAddOk = (e) => {//新增数据
        const type = this.state.form.type;
        const grade = this.state.form.grade;
        const content = this.state.form.content;
        const difficulty = this.state.form.difficulty;
        const score = this.state.form.score;
        const answer = this.state.form.answer;
        const token = cookie.load('token');

        console.log(type, grade, content, difficulty, score, answer)
        if (type === undefined || grade === undefined || content === undefined || difficulty === undefined || score === undefined || answer === undefined || token === undefined) {
            alert("输入不能为空")
            return
        }

        axios.post("http://127.0.0.1:8080/api/browse/saveTest", {
            type: type,
            grade: grade,
            content: content,
            difficulty: difficulty,
            score: score,
            answer: answer,
            token: token.Data
        }).then(require => {
            this.refreshComponent();
        }).catch(error => {
            console.log(error)
        })

        // 清空输入框中的值并关闭Modal
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                addContent: ''
            },
            visible: false
        }));

    }

    handleAddCancel = () => {
        this.setState({ visible: false, addContent: '' });
    }

    handleEditChange = (key, value) => {
        const editForm = { ...this.state.editForm };
        editForm[key] = value;
        this.setState({ editForm });
    }

    handleSearchClick = (e) => {//搜索请求
        const inputValue = this.inputRef.current.value;
        if (inputValue === "") {
            alert("请输入要查询的内容！！！")
            return
        }
        axios.get('http://127.0.0.1:8080/api/browse/searchTests?data=' + inputValue).then(response => {
            console.log(response.data.Data);
            if (response.data.Data === null) {
                alert("暂无查询到该题目")
                return
            }
            this.inputRef.current.value = ""
            this.setState({ TestLists: response.data.Data.test, TitlePages: response.data.Data.totle })
        }).catch(error => {
            console.log(error);
        });
    }

    handleDelete = (e) => {//点击表格后的删除做到删除单挑记录
        //此处后端请求批量删除
        //TODO: 用于保存到合约操作
        axios.post("http://127.0.0.1:8080/api/browse/deleteTests", {
            strList: { e: '' + e + '' },
            token: this.token
        })
            .then(require => {
                console.log(require)
                message.success("删除成功")
                this.refreshComponent(); // 请求成功后重新加载组件
            })
            .catch(error => {
                console.error(`请求失败：${error}`);
            });
    }

    confirm = () => {
        message.error('取消了删除')
    }

    handleEditOk = () => {//修改请求
        const { id, type, grade, content, difficulty, score, answer } = this.state.editForm;
        console.log(id, type, grade, content, difficulty, score, answer)
        //TODO: 增加合约请求，用于保存操作数据

        // 处理编辑操作，将新的数据提交给后端保存
        const token = cookie.load('token');
        // console.log(token)
        axios.post("http://127.0.0.1:8080/api/browse/updateTests", {
            id: ""+id+"",
            type: type,
            grade: grade,
            content: content,
            difficulty: difficulty,
            score: ""+score+"",
            answer: answer,
            token: token.Data
        }).then(require => {
            message.success("修改成功")
            this.refreshComponent(); // 请求成功后重新加载组件
        }).catch(error => {
            message.error("修改失败: " + error)
        })

        this.setState({ editVisible: false }); // 关闭编辑试题模态框
    }

    handleEditCancel = () => {
        this.setState({
            editVisible: false
        });
    }

    render() {
        const { loading, TestLists, page, TitlePages, error } = this.state;

        // 如果发生了错误，则展示错误信息
        if (error) {
            return <div style={{color: 'red'}}>{error}</div>;
        }

        return (
            <>
                {/* 顶部搜索框 */}
                <div className="search_top">
                    <div className="title" onClick={this.refreshComponent}>试题管理</div>
                    <input placeholder="请输入要查询的内容" className="search_input" type="text"
                        style={{ width: "300px", margin: "0 10px" }} ref={this.inputRef} />
                    <input className="input_button" type="submit" value={"查询"} onClick={this.handleSearchClick} style={{ margin: "0 10px" }} />
                    <span className="input_button_add" type="submit" value={"新增"} onClick={this.handleAddClick} style={{ margin: "0 10px" }} >
                        <PlusOutlined style={{paddingTop: "7px"}}/>
                    </span>
                </div>

                {/* 中部数据展示框 */}
                <div className={`data_middle`}>
                    {loading ? (
                         <Spin /> // 如果loading状态为true，则展示数据加载中的提示信息
                    ) : (
                        <>
                            {TestLists != null ? ( // 如果有数据则展示表格
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" id="myCheckbox" name="myCheckbox" value="1" onChange={this.handleSelectAll} />
                                            </th>
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
                                                <td><input type="checkbox" id={item.id} name='myCheckbox' value="1" onChange={this.handleCheckboxChange} /></td>
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
                                                    <button type="submit" onClick={() => this.handleEdit(item)}>修改</button>
                                                    &nbsp; &nbsp; &nbsp;
                                                    <Popconfirm
                                                        title="确定要删除这个试题吗？"
                                                        onConfirm={() => this.handleDelete(item.id)}
                                                        onCancel={this.confirm}
                                                        okText="确定删除"
                                                        cancelText="取消删除" // 将Cancel按钮的文本替换为"关闭"
                                                    >
                                                        {/* <button type="submit">删除</button> */}
                                                        <Link to={'#'} style={{ textDecoration: 'none' }}>删除</Link>
                                                    </Popconfirm>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" id="myCheckbox" name="myCheckbox" value="1" /></th>
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
                                            <tr>
                                                <td></td>
                                                <td colspan="9"><div>暂无数据</div></td>
                                                <td>无操作</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </>
                            )}
                        </>
                    )}
                </div>

                {/* 底部分页组件 */}
                <div className="paging_button">
                    <Popconfirm
                        title="确定要删除选中的试题吗？"
                        onConfirm={this.getCheckTrue}
                        onCancel={this.confirm}
                        okText="确定删除"
                        cancelText="取消删除" // 将Cancel按钮的文本替换为"关闭"
                    >
                        {/* <button type="submit">删除</button> */}
                        <Link to={'#'} style={{ textDecoration: 'none' }}><span>批量删除</span></Link>
                    </Popconfirm>
                    {/* <div onClick={this.getCheckTrue}><span>批量删除</span></div> */}
                    <Pagination defaultCurrent={1} current={page} total={TitlePages * 10} onChange={this.handleChangePage} />,
                </div>

                {/* 点击新增弹出的交互框 */}
                <Modal
                    title="添加试题"
                    visible={this.state.visible}
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}
                    okText="确定"
                    cancelText="关闭" // 将Cancel按钮的文本替换为"关闭"
                >
                    <span className="label">题&nbsp;&nbsp;&nbsp;型：</span>
                    <input placeholder="题型" value={this.state.form.type} onChange={(e) => this.handleChangeAddContent('type', e.target.value)} /><br />
                    <br />
                    <span className="label">考试班级：</span>
                    <input placeholder="考试班级" value={this.state.form.grade} onChange={(e) => this.handleChangeAddContent('grade', e.target.value)} /><br />
                    <br />
                    <span className="label">题&nbsp;&nbsp;&nbsp;目：</span>
                    <input placeholder="题目" value={this.state.form.content} onChange={(e) => this.handleChangeAddContent('content', e.target.value)} /><br />
                    <br />
                    <span className="label">难&nbsp;&nbsp;&nbsp;度：</span>
                    <input placeholder="难度" value={this.state.form.difficulty} onChange={(e) => this.handleChangeAddContent('difficulty', e.target.value)} /><br />
                    <br />
                    <span className="label">分&nbsp;&nbsp;&nbsp;值：</span>
                    <input placeholder="分值" value={this.state.form.score} onChange={(e) => this.handleChangeAddContent('score', e.target.value)} /><br />
                    <br />
                    <span className="label">答&nbsp;&nbsp;&nbsp;案：</span>
                    <input placeholder="答案" value={this.state.form.answer} onChange={(e) => this.handleChangeAddContent('answer', e.target.value)} /><br />


                </Modal>

                {/* 点击修改弹出的交互文本框 */}
                <Modal
                    title="编辑试题"
                    visible={this.state.editVisible}
                    onOk={this.handleEditOk}
                    // handleEditChange
                    onCancel={this.handleEditCancel}
                    okText="确定"
                    cancelText="关闭" // 将Cancel按钮的文本替换为"关闭"
                >
                    <Form>
                        <Form.Item label="序号">
                            {this.state.editForm.id}
                        </Form.Item>
                        <Form.Item label="题型">
                            <Input value={this.state.editForm.type} onChange={(e) => this.handleEditChange('type', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="考试班级">
                            <Input value={this.state.editForm.grade} onChange={(e) => this.handleEditChange('grade', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="题目">
                            <Input value={this.state.editForm.content} onChange={(e) => this.handleEditChange('content', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="难度">
                            <Input value={this.state.editForm.difficulty} onChange={(e) => this.handleEditChange('difficulty', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="分值">
                            <Input value={this.state.editForm.score} onChange={(e) => this.handleEditChange('score', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="答案">
                            <Input value={this.state.editForm.answer} onChange={(e) => this.handleEditChange('answer', e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>

            </>
        )
    }
}
