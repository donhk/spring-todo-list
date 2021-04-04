import AuthenticationService from "./AuthenticationService";
import {Component} from "react";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };
        this.loginClicked = this.loginClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    loginClicked() {
        let username = this.state.username;
        let password = this.state.password;
        AuthenticationService.executeJwtAuthenticationService(username, password).then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(username, response.data.token)
                this.props.history.push(`/welcome/${username}`)
            }
        ).catch((error) => {
                console.log(error)
                this.setState({
                    hasLoginFailed: true,
                    showSuccessMessage: false
                });
            }
        );
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    User Name: <input type="text" name="username"
                                      value={this.state.username} onChange={this.handleChange}/>

                    Password: <input type="password" name="password"
                                     value={this.state.password} onChange={this.handleChange}/>

                    <button className="btn" onClick={this.loginClicked}> login</button>
                    {this.state.hasLoginFailed && <div className="alert-warning">Invalid Credentials</div>}
                </div>
            </div>
        );
    }

}

export default LoginComponent;