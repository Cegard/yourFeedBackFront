import React, { Component } from 'react';
import {    Link   } from 'react-router-dom'


class HeaderApp extends Component{
    render(){
        return(
        <header className="App-header center">
          <h1 className="App-title">Welcome to Your Feed Back  <Link to="/login" className="item right">Log-out</Link></h1>
         
        </header>
        );
    }
}

export default HeaderApp;
