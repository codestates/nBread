import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Subscribers from './component/Subscribers';
import SignUp from './modal/SignUp';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Comment from './component/Comment';
import LoginUser from './component/LoginUser';
import Chatting_test from './modal/Chatting_test';
import ChattingDetail from './component/ChattingDetail';
import ProfileImage from './component/ProfileImage';
import Test from './modal/Test';
import 'antd/dist/antd.css';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route path="/MyPage">
          <MyPage/>
        </Route>
        <Route path="/Main">
          <Main/>
        </Route>
    </BrowserRouter>
  );
}

export default App;
