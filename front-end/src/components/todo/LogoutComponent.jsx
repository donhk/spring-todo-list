const {Component} = require("react");

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thanks for using our application
                </div>
            </>
        );
    }
}

export default LogoutComponent