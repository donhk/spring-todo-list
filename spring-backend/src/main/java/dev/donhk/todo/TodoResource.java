package dev.donhk.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {

    @Autowired
    private TodoHardcodedService todoService;

    @GetMapping(path = "/users/{user_name}/todos")
    public List<Todo> getUserTodos(@PathVariable String user_name) {
        return todoService.findAll();
    }

    @GetMapping(path = "/users/{user_name}/todos/{id}")
    public Todo getUserTodos(@PathVariable String user_name, @PathVariable String id) {
        return todoService.findById(Long.parseLong(id));
    }

    @DeleteMapping(path = "/users/{user_name}/todos/{todo_id}")
    public ResponseEntity<Void> deleteUserTodo(@PathVariable String user_name, @PathVariable String todo_id) {
        Todo todo = todoService.deleteById(Long.parseLong(todo_id));
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(path = "/users/{user_name}/todos/{todo_id}")
    public ResponseEntity<Todo> updateUserTodo(@PathVariable String user_name,
                                               @PathVariable String todo_id,
                                               @RequestBody Todo todo) {
        Todo todo1 = todoService.update(todo);
        return new ResponseEntity<>(todo1, HttpStatus.OK);
    }

    @PostMapping(path = "/users/{user_name}/todos")
    public ResponseEntity<Void> createUserTodo(@PathVariable String user_name, @RequestBody Todo todo) {
        Todo todo1 = todoService.update(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todo1.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

}
