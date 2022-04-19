import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import LandingPage from './pages/LandingPage';
import 'antd/dist/antd.css';

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
