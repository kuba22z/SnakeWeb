package com.example.snakeweb.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//API Layer
@RestController
@RequestMapping(path = "api/user")
@CrossOrigin("*")
//allow everything to be my endpoint -> caused that Frontend can access backend
public class UserController {
    private final UserService userService;

    @Autowired //caused that the Constructor will be automaticly called if we use this class
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUserService() {
        return userService.getAllUser();
    }

    @PostMapping
    public User registerNewUser(@RequestBody User user) {
        return userService.addNewUser(user);
    }

    @PutMapping(path = "{userId}")
    public User updateRecord(
            @PathVariable("userId") Long userId,
            @RequestParam(required = true) int newrecord) {
        return userService.updateRecord(userId, newrecord);
    }
}