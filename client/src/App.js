import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';
import SignUp from './modal/SignUp';
import Main from './pages/Main';
import MyPage from './pages/MyPage';

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
    </BrowserRouter>
  );
}

export default App;
