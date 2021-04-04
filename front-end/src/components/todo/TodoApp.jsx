import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from "./AuthenticatedRoute"
import LoginComponent from "./LoginComponent";
import ListTodoComponent from "./ListTodoComponent";
import WelcomeComponent from "./WelcomeComponent";
import LogoutComponent from "./LogoutComponent";
import ErrorComponent from "./ErrorComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route exact path="/" component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute exact path="/todos" component={ListTodoComponent}/>
                            <AuthenticatedRoute exact path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute exact path="/todos/:id" component={TodoComponent}/>
                            <Route path="" component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp