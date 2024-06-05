package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.existsByUserName(user.getUserName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("UserName already exists");
        }

        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/validate")
    public Optional<User> validateUser(@RequestParam String userName, @RequestParam String password) {
        return userService.validateUser(userName, password);
    }

}
