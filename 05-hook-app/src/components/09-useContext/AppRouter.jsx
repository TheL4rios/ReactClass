import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { AboutScreen } from './AboutScreen';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
import { Navbar } from './Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path="/about" component={ AboutScreen }/>
                        <Route exact path="/login" component={ LoginScreen }/>
                        <Route exact path="/" component={ HomeScreen }/>

                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
