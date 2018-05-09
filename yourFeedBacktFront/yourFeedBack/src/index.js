import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Template from './views/template/Template';
import Login from './views/Login';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Switch , Route  } from 'react-router-dom'
ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route  path="/Login" component={Login}/>
        <Route  path="/Template" component={Template}/>
      </Switch>
    </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
