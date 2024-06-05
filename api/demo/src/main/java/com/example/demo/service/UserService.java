package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            if (!user.getUserName().equals(userDetails.getUserName()) && userRepository.existsByUserName(userDetails.getUserName())) {
                throw new RuntimeException("Username already exists");
            }
            
            if (!user.getEmail().equals(userDetails.getEmail()) && userRepository.existsByEmail(userDetails.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            
            user.setUserName(userDetails.getUserName());
            user.setEmail(userDetails.getEmail());
    
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> validateUser(String userName, String password) {

        // 1. Find user by username
        Optional<User> userOpt = userRepository.findByUserName(userName);

        if (!userOpt.isPresent()) {
            return null;
        }

        // 2. Check if user exists and password matches
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            System.out.println("COINCIDEN CONTRASENAS");
            return userOpt;
        }

        // Password mismatch, return null
        return null;
    }

}
