package com.example.snakeweb.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//API Layer
@RestController
@RequestMapping(path="api/user")
@CrossOrigin("*")
//allow everything to be my endpoint -> caused that Frontend can access backend
public class UserController {
    private final UserService userService;

    @Autowired //caused that the Constructor will be automaticly called if we use this class
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getuserService() {
        return userService.getUser();
    }

    @GetMapping(path = "{username}")
    public Optional<User> getuserByNameService(
            @PathVariable("username") String userName) {
        return userService.getOneUser(userName);
    }


    @PostMapping
    public void registerNewuser(@RequestBody User user){
       userService.addNewUser(user);
    }
/*
    @DeleteMapping(path = "{userId}") //userId will be appended to the current path
    public void deleteuser(@PathVariable("userId") Long id){
        userService.deleteuser(id);
    }
*/


   /* @PutMapping(path ="{userId}")
    public void updateuser(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email)
    {
        userService.updateuser(userId,name,email);
    }*/


}