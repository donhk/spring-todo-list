import moment from "moment";
import {Form, Formik, Field, ErrorMessage} from "formik";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

const {Component} = require("react");

class TodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {
        let user = AuthenticationService.getLoggedInUserName();
        if (this.state.id === -1) {
            TodoDataService.createTodo(user, {
                id: -1,
                description: values.description,
                targetDate: values.targetDate
            }).then(() => {
                this.props.history.push('/todos');
            });
        } else {
            TodoDataService.updateTodo(user, this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(() => {
                this.props.history.push('/todos');
            });
        }
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }
        let user = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(user, this.state.id).then(t => {
            this.setState({
                id: t.data.id,
                description: t.data.description,
                targetDate: t.data.targetDate
            })
        })
    }

    validate(values) {
        let errors = {}

        if (!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length < 4) {
            errors.description = 'Enter at least 4 chars in description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid TargetDate'
        }

        return errors;
    }

    render() {
        let {description, targetDate} = this.state;
        console.log("description: " + description)
        console.log("targetDate: " + targetDate)
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{
                        description: description,
                        targetDate: moment(targetDate).format('YYYY-MM-DD')
                    }}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}>
                        {() => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent;