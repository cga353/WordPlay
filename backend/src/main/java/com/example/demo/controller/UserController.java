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

    /**
     * Obtiene todos los usuarios.
     *
     * @return Una lista de todos los usuarios.
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param user El usuario a crear.
     * @return Una respuesta con el usuario creado o un error si ya existe.
     */
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

    /**
     * Obtiene un usuario por ID.
     *
     * @param id El ID del usuario.
     * @return El usuario correspondiente al ID.
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    /**
     * Actualiza un usuario existente.
     *
     * @param id          El ID del usuario.
     * @param userDetails Los nuevos datos del usuario.
     * @return Una respuesta con el usuario actualizado o un error si no se pudo
     *         actualizar.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Valida un usuario por nombre de usuario y contraseña.
     *
     * @param userName El nombre de usuario.
     * @param password La contraseña del usuario.
     * @return El usuario validado.
     */
    @GetMapping("/validate")
    public Optional<User> validateUser(@RequestParam String userName, @RequestParam String password) {
        return userService.validateUser(userName, password);
    }

    /**
     * Elimina un usuario.
     *
     * @param id El ID del usuario.
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
