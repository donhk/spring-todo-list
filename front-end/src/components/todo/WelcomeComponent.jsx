import {Link} from "react-router-dom";
import {Component} from "react";
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = {
            welcomeMessage: ''
        }
    }

    retrieveWelcomeMessage() {
        let promise = HelloWorldService.executeHelloWorldServiceName(this.props.match.params.name);
        promise.then(response => this.handleSuccessfulResponse(response)
        ).catch(error => this.handleError(error));
    }

    handleError(error) {
        console.log(error.response);
        let errorMessage = '';
        if (error.message) {
            errorMessage += error.message;
        }
        if (error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }
        this.setState({welcomeMessage: errorMessage})
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data.message});
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container"> Welcome {this.props.match.params.name} You can manage your todos <Link
                    to="/todos">here</Link></div>
                <div className="container"> Click here to get a customized message
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Click Me!</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
}

export default WelcomeComponent;
