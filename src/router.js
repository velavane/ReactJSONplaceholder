import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import List from '../src/components/list';
import Add from '../src/components/add';
import Edit from '../src/components/edit';

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/add" component={Add} />
                <Route path="/edit/:id" component={Edit} />
            </Switch>
        </Router>
    )
}