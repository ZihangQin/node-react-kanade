import React from "react";
import './DynamicTable.css';
import { Pagination } from 'antd';
export default class DynamicTable extends React.Component {
    render() {
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
                    <h1>这里是中部数据</h1>
                </div>
                <div className="paging_button">
                <Pagination defaultCurrent={1} total={50} />,
                </div>
            </>
        )
    }
}