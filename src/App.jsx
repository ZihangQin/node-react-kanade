import { React, Component } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import { Button } from 'antd';
import "./App.css";

import Login from './pages/login/index'
import Sider from './pages/main/index'
import Register from './pages/register';

export default class App extends Component {
    render() {
        return (
            <Router>
               <div>
               <Routes>
                            <Route path='/' element={<Login />} /> 
                            <Route path="/login" element={<Login />} />
                            <Route path="/index" element={<Sider />} />
                            <Route path='/register' element={<Register />}/>
                        {/* </Route> */}
                </Routes>
               </div>
            </Router>
        )
    }
}