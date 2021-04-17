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
public class TodoJpaResource {

    @Autowired
    private TodoHardcodedService todoService;

    @Autowired
    private TodoJpaRepository todoJpaRepository;


    @GetMapping(path = "/jpa/users/{user_name}/todos")
    public List<Todo> getUserTodos(@PathVariable String user_name) {
        return todoJpaRepository.findByUsername(user_name);
    }

    @GetMapping(path = "/jpa/users/{user_name}/todos/{id}")
    public Todo getUserTodos(@PathVariable String user_name, @PathVariable String id) {
        return todoJpaRepository.findById(Long.parseLong(id)).get();
    }

    @DeleteMapping(path = "/jpa/users/{user_name}/todos/{todo_id}")
    public ResponseEntity<Void> deleteUserTodo(@PathVariable String user_name, @PathVariable String todo_id) {
        todoJpaRepository.deleteById(Long.parseLong(todo_id));
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/jpa/users/{user_name}/todos/{todo_id}")
    public ResponseEntity<Todo> updateUserTodo(@PathVariable String user_name,
                                               @PathVariable String todo_id,
                                               @RequestBody Todo todo) {
        todo.setUsername(user_name);
        todo.setId(Long.valueOf(todo_id));
        Todo saved = todoJpaRepository.save(todo);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @PostMapping(path = "/jpa/users/{user_name}/todos")
    public ResponseEntity<Void> createUserTodo(@PathVariable String user_name, @RequestBody Todo todo) {
        Todo created = todoJpaRepository.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

}
