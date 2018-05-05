import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App'
import HomePage from '../components/HomePage'


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}  />
            <Route exact path="/home" component={App} />
        </Switch>

    </BrowserRouter>
)

export default Router; 

