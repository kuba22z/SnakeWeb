package com.example.snakeweb.user;

import org.springframework.beans.factory.annotation.Autowired;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

//Service Layer / Model
@org.springframework.stereotype.Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }

    public List<User> getUser() {
        return userRepository.findAll();
        //findAll() retruns a List<User>
    }
    public Optional<User> getOneUser(String name){
        return userRepository.findUserByName(name);
    }


    public void addNewUser(User user) {
        Optional<User> userOptional =
                userRepository.findUserByName(user.getName());
        if (userOptional.isEmpty() )
            userRepository.save(user);

    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id))
            throw new IllegalStateException("User with id " + id + " does not exists");
        userRepository.deleteById(id);
    }

    @Transactional  //caused that all Queries will be executed in a transaciton
    public void updateUser(Long id, String name, String email) {
     /*   User User = UserRepository.findById(id).
                orElseThrow(() -> new IllegalStateException(
                        "User with id" + id + " does not exists"));

        if (name != null && name.length() > 0 && !Objects.equals(User.getName(), name))
            User.setName(name);

        if (email != null && email.length() > 0 && !Objects.equals(User.getEmail(), email)) {
            Optional<User> UserOptional = UserRepository.findUserByEmail(email);
            if (UserOptional.isPresent())
                throw new IllegalStateException("email taken");
            User.setEmail(email);
        }*/
    }
}