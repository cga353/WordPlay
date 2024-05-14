package com.example.demo.controller;

import com.example.demo.entity.Attempt;
import com.example.demo.entity.AuxId;
import com.example.demo.entity.Guess;
import com.example.demo.repository.GuessRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/guesses")
public class GuessController {

    @Autowired
    private GuessRepository guessRepository;

    // Ruta GET para obtener todos los usuarios
    @GetMapping
    public List<Guess> getAllGuess() {
        return (List<Guess>) guessRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Attempt> getGuessByUserId(@PathVariable Long userId) {
        return guessRepository.findByUserId(userId);
    }

    @GetMapping("/word/{wordId}")
    public List<Attempt> getGuessByWordId(@PathVariable Long wordId) {
        return guessRepository.findByWordId(wordId);
    }

    @GetMapping("/{userId}/{wordId}")
    public Optional<Guess> getGuessByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return guessRepository.findById(new AuxId(userId, wordId));
    }

    @PostMapping
    public Guess createGuess(@RequestBody Guess guess) {
        return guessRepository.save(guess);
    }

    @PutMapping("/{userId}/{wordId}")
    public Guess updateGuess(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Guess guess) {
        guess.setUserId(userId);
        guess.setWordId(wordId);
        return guessRepository.save(guess);
    }

    @DeleteMapping("/{userId}/{wordId}")
    public void deleteGuess(@PathVariable Long userId, @PathVariable Long wordId) {
        guessRepository.deleteById(new AuxId(userId, wordId));
    }
}
