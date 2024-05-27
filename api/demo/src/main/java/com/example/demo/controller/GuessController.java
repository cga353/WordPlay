package com.example.demo.controller;

import com.example.demo.entity.Guess;
import com.example.demo.service.GuessService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/guesses")
public class GuessController {

    @Autowired
    private GuessService guessService;

    @GetMapping
    public List<Guess> getAllGuesses() {
        return guessService.getAllGuesses();
    }

    @GetMapping("/user/{userId}")
    public List<Guess> getGuessesByUserId(@PathVariable Long userId) {
        return guessService.getGuessesByUserId(userId);
    }

    @GetMapping("/word/{wordId}")
    public List<Guess> getGuessesByWordId(@PathVariable Long wordId) {
        return guessService.getGuessesByWordId(wordId);
    }

    @GetMapping("/{userId}/{wordId}")
    public Optional<Guess> getGuessByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return guessService.getGuessByUserIdAndWordId(userId, wordId);
    }

    @PostMapping
    public Guess createGuess(@RequestBody Guess guess) {
        return guessService.createGuess(guess);
    }

    @PutMapping("/{userId}/{wordId}")
    public Guess updateGuess(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Guess guess) {
        return guessService.updateGuess(userId, wordId, guess);
    }

    @DeleteMapping("/{userId}/{wordId}")
    public void deleteGuess(@PathVariable Long userId, @PathVariable Long wordId) {
        guessService.deleteGuess(userId, wordId);
    }
}
