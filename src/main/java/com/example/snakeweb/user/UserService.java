package com.example.snakeweb.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

//Service Layer / Model
@org.springframework.stereotype.Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUser() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "record"));
    }

    @Transactional //caused that all Queries will be executed in a transiction
    public User addNewUser(User user) {
        Optional<User> userOptional =
                userRepository.findUserByName(user.getName());
        if (userOptional.isEmpty()) {
            userRepository.save(user);
            return user;
        } else
            return userOptional.get();
    }

    @Transactional
    public User updateRecord(Long id, int newRecord) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new IllegalStateException(
                        "User with id: " + id + " does not exists"));
        user.setRecord(newRecord);
        return user;
    }
}