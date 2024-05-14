package com.example.demo.controller;

import com.example.demo.entity.Attempt;
import com.example.demo.entity.AuxId;
import com.example.demo.repository.AttemptRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attempts")
public class AttemptController {

    @Autowired
    private AttemptRepository attemptRepository;

    // Ruta GET para obtener todos los usuarios
    @GetMapping
    public List<Attempt> getAllAttempt() {
        return (List<Attempt>) attemptRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Attempt> getAttemptsByUserId(@PathVariable Long userId) {
        return attemptRepository.findByUserId(userId);
    }

    @GetMapping("/word/{wordId}")
    public List<Attempt> getAttemptsByWordId(@PathVariable Long wordId) {
        return attemptRepository.findByWordId(wordId);
    }

    @GetMapping("/{userId}/{wordId}")
    public Optional<Attempt> getAttemptByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return attemptRepository.findById(new AuxId(userId, wordId));
    }

    // Ruta POST para crear un nuevo usuario
    @PostMapping
    public Attempt createAttempt(@RequestBody Attempt attempt) {
        return attemptRepository.save(attempt);
    }

    // Ruta PUT para actualizar un intento de palabra existente
    @PutMapping("/{userId}/{wordId}")
    public Attempt updateAttempt(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Attempt attempt) {
        attempt.setUserId(userId);
        attempt.setWordId(wordId);
        return attemptRepository.save(attempt);
    }

    // Ruta DELETE para eliminar un usuario por su ID
    @DeleteMapping("/{userId}/{wordId}")
    public void deleteAttempt(@PathVariable Long userId, @PathVariable Long wordId) {
        attemptRepository.deleteById(new AuxId(userId, wordId));
    }
}