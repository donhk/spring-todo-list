import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";
import {Component} from "react";
import {withRouter} from 'react-router';

class HeaderComponent extends Component {
    render() {
        const isUserLogin = AuthenticationService.isUserLogin();
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><Link to="/" className="navbar-brand">donhk.dev</Link></div>
                        <ul className="navbar-nav">
                            {isUserLogin && <li><Link className="nav-link" to="/welcome/abc">Home</Link></li>}
                            {isUserLogin && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLogin && <li><Link className="nav-link" to="/login">login</Link></li>}
                            {isUserLogin && <li><Link className="nav-link" to="/logout"
                                                      onClick={AuthenticationService.logout}>logout</Link></li>}
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);