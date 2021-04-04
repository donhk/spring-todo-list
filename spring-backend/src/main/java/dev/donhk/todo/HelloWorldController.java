package dev.donhk.todo;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @GetMapping(path = "/")
    public String helloWorld() {
        return "Hello, World";
    }

    @GetMapping(path = "/bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Frederick is here!");
    }

    @GetMapping(path = "/bean/{name}")
    public HelloWorldBean helloWorldBeanName(@PathVariable String name) {
        return new HelloWorldBean(name + " is here!");
    }

}


