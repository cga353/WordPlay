package com.example.demo.controller;

import com.example.demo.entity.Attempt;
import com.example.demo.service.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attempts")
public class AttemptController {

    @Autowired
    private AttemptService attemptService;

    @GetMapping
    public List<Attempt> getAllAttempts() {
        return attemptService.getAllAttempts();
    }

    @GetMapping("/top5/user/{userId}")
    public List<Attempt> getTop5AttemptsByUserId(@PathVariable Long userId) {
        return attemptService.getTop5AttemptsByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Attempt> getAttemptsByUserId(@PathVariable Long userId) {
        return attemptService.getAttemptsByUserId(userId);
    }

    @GetMapping("/word/{wordId}")
    public List<Attempt> getAttemptsByWordId(@PathVariable Long wordId) {
        return attemptService.getAttemptsByWordId(wordId);
    }

    @GetMapping("/{userId}/{wordId}")
    public Optional<Attempt> getAttemptByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return attemptService.getAttemptByUserIdAndWordId(userId, wordId);
    }

    @PostMapping
    public Attempt createAttempt(@RequestBody Attempt attempt) {
        return attemptService.createAttempt(attempt);
    }

    @PutMapping("/{userId}/{wordId}")
    public Attempt updateAttempt(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Attempt attempt) {
        return attemptService.updateAttempt(userId, wordId, attempt);
    }

    @DeleteMapping("/{userId}/{wordId}")
    public void deleteAttempt(@PathVariable Long userId, @PathVariable Long wordId) {
        attemptService.deleteAttempt(userId, wordId);
    }
}
