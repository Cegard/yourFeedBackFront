import React, { Component } from 'react';
import './../../css/App.css';
import MenuApp from './MenuApp'
import HeaderApp from './HeaderApp'
import FooterApp from './FooterApp'
import MainApp from './MainApp'
class App extends Component {
  

  render() {
    return (
      <div className="App">
        <HeaderApp />
        <MenuApp />
        <MainApp />
        <FooterApp />
      </div>
    );
  }
}

export default App;