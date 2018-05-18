import React, {Component} from 'react';
//import ModalFormApp from './modal/ModalFormApp';
import TableEventApp from './../TableEventApp.js';
import TableReport from './../TableReport.js';
import Profile from './../Profile.js';
import Event from './../Event.js';
import ReportEvent from './../ReportEvent.js';
import Evaluation from './../Evaluation.js';


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
                        <Route  path="/Template/Evaluation/:id" component={Evaluation}/>
                        <Route  path="/Template/Event/:id" component={Event}/>
                        <Route  path="/Template/ReportEvent/:id" component={ReportEvent}/>
                        <Route  path="/Template/EventTable" component={TableEventApp}/>
                        <Route  path="/Template/ReportTable" component={TableReport}/>
                    </Switch>
                    
                </div>
            
        );
    }
}
export default MainApp