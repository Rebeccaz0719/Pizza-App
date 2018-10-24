import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Home from '../views/home';
import Success from '../views/success';
const Routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/success" component={Success}></Route>
        </Switch>
    </BrowserRouter>
)
export default Routes