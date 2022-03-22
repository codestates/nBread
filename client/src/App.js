import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
