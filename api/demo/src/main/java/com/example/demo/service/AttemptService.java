package com.example.demo.service;

import com.example.demo.entity.Attempt;
import com.example.demo.entity.AuxId;
import com.example.demo.repository.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttemptService {

    @Autowired
    private AttemptRepository attemptRepository;

    public List<Attempt> getAllAttempts() {
        return (List<Attempt>) attemptRepository.findAll();
    }

    public List<Attempt> getAttemptsByUserId(Long userId) {
        return attemptRepository.findByUserId(userId);
    }

    public List<Attempt> getAttemptsByWordId(Long wordId) {
        return attemptRepository.findByWordId(wordId);
    }

    public Optional<Attempt> getAttemptByUserIdAndWordId(Long userId, Long wordId) {
        return attemptRepository.findById(new AuxId(userId, wordId));
    }

    public Attempt createAttempt(Attempt attempt) {
        return attemptRepository.save(attempt);
    }

    public Attempt updateAttempt(Long userId, Long wordId, Attempt attempt) {
        attempt.setUserId(userId);
        attempt.setWordId(wordId);
        return attemptRepository.save(attempt);
    }

    public void deleteAttempt(Long userId, Long wordId) {
        attemptRepository.deleteById(new AuxId(userId, wordId));
    }
}
