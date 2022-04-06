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
// import 'antd/dist/antd.css';



function App() {
  return (
    <BrowserRouter>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/signUp">
          <SignUp/>
        </Route>
        <Route path="/MyPage">
          <MyPage/>
        </Route>
        <Route path="/sub">
          <Subscribers/>
        </Route>
        <Route path="/comment">
          <Comment/>
        </Route>
        <Route path="/LoginUser">
          <LoginUser/>
        </Route>
        <Route path="/test">
          <Chatting_test/>
        </Route>
        <Route path="/ChattingDetail">
          <ChattingDetail/>
        </Route>
        <Route path="/ProfileImage">
          <ProfileImage/>
        </Route>
        <Route path="/chat">
          <Test/>
        </Route>
    </BrowserRouter>
  );
}

export default App;
