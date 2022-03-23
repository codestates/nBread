import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';
import SignUp from './modal/SignUp';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main/>
      </Route>
      <Route exact path="/signUp">
        <SignUp/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
