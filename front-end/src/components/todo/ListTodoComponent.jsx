import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

const {Component} = require("react");

class ListTodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let user = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(user).then(xTodos => this.setState({todos: xTodos.data}))
    }

    deleteTodoClicked(id) {
        let user = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(user, id).then(s => {
            console.log('remove done')
            this.setState({message: `Delete of todo ${id} successful`})
            this.refreshTodos()
        }).catch((e) => {
            console.log('error: ' + e.toString())
            this.refreshTodos()
        });
    }

    updateTodo(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    {this.state.message && <div className="alert alert-success"> {this.state.message} </div>}
                    <table className="table">
                        <thead>
                        <tr>
                            <th>description</th>
                            <th>done</th>
                            <th>targetDate</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <button onClick={() => this.updateTodo(todo.id)}
                                                className="btn btn-success">Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.deleteTodoClicked(todo.id)}
                                                className="btn btn-warning">Remove
                                        </button>
                                    </td>
                                </tr>)
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListTodoComponent;