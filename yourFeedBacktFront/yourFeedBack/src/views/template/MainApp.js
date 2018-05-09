import React, {Component} from 'react';
//import ModalFormApp from './modal/ModalFormApp';
import TableEventApp from './../TableEventApp.js';
import Profile from './../Profile.js';
import Event from './../Event.js';


  import {
    Switch,
    Route
   } from 'react-router-dom'
  

class MainApp extends Component{
    render(){
        return(
                <div className="App-main">
                    <Switch>
                        <Route  path="/Template/Profile" component={Profile}/>
                        <Route  path="/Template/Event/:id" component={Event}/>
                        <Route  path="/Template/EventTable" component={TableEventApp}/>
                    </Switch>
                    
                </div>
            
        );
    }
}
export default MainApp