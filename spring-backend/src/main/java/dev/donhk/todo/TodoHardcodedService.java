package dev.donhk.todo;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {

    private static long idx = 1;
    private static List<Todo> todos = new ArrayList<>();

    static {
        todos.add(new Todo(idx++, "abc", "lorem ipsulum 1", false, LocalDate.now()));
        todos.add(new Todo(idx++, "abc", "lorem ipsulum 2", false, LocalDate.now()));
        todos.add(new Todo(idx++, "abc", "lorem ipsulum 3", false, LocalDate.now()));
        todos.add(new Todo(idx++, "abc", "lorem ipsulum 4", false, LocalDate.now()));
        todos.add(new Todo(idx++, "abc", "lorem ipsulum 5", false, LocalDate.now()));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        todos.remove(todo);
        return todo;
    }

    public Todo update(Todo todo) {
        if (todo.getId() <= 0) {
            todo.setId(idx++);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo findById(long id) {
        return todos.stream().filter(todo -> todo.getId() == id).findFirst().orElse(null);
    }
}
