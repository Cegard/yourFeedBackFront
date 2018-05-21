import React,{Component} from 'react';
import { Menu } from 'semantic-ui-react'

import {    Link   } from 'react-router-dom'

class MenuApp extends Component{
    state = { activeItem: 'home' }
    render(){
        return(
            <div className="div-menu">
           
                <Menu    vertical floated={true} className="App-menu">
                        <Link to="/Template/Profile" className="item">Profile</Link>
                        <Link to="/Template/EventTable" className="item">Events</Link>
                        <Link to="/Template/ReportTable" className="item">Report</Link>
                </Menu>
                
            </div>
        );
    }
}
export default MenuApp;
