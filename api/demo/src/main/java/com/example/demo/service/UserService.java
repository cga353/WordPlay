package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        System.out.println("Service: " + userDetails + " contraseña:" + userDetails.getPassword());

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println(userDetails);
            System.err.println(userDetails.getPassword());
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setUserName(userDetails.getUserName());
            user.setPassword(userDetails.getPassword());
            System.out.println("dentro del if: " + user + " contraseña:" + user.getPassword());

            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> validateUser(String userName, String password) {

        // 1. Find user by username
        Optional<User> userOpt = userRepository.findByUserName(userName);

        if(!userOpt.isPresent()){
            return null;
        }

        // 2. Check if user exists and password matches
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            System.out.println("COINCIDEN CONTRASENAS");
            return userOpt;
        }

        //Password mismatch, return null
        return null;
    }

}
