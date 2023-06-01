import React from "react";
import { Modal } from 'antd';

export default class AddTest extends React.Component{
    state = {
        addContent: '', // 存储输入的新增内容
    }
    
    handleChangeAddContent = (e) => {
        this.setState({ addContent: e.target.value });
    }
    
    render(){
        return(
            <Modal
        title="新增内容"
        visible={this.state.visible}
        onOk={this.handleAddOk}
        onCancel={this.handleAddCancel}
    >
        <input type="text" value={this.state.addContent} onChange={this.handleChangeAddContent} />
    </Modal>
        )
    }
    
}