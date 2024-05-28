package com.example.demo.service;

import com.example.demo.entity.Guess;
import com.example.demo.entity.AuxId;
import com.example.demo.repository.GuessRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GuessService {

    @Autowired
    private GuessRepository guessRepository;

    public List<Guess> getAllGuesses() {
        return (List<Guess>) guessRepository.findAll();
    }

    public Map<String, Integer> getGuessStatistics(Long userId) {
        List<Guess> guesses = getGuessesByUserId(userId);
        int guessedCount = 0;
        int notGuessedCount = 0;

        for (Guess guess : guesses) {
            if (guess.getisGuessed()) {
                guessedCount++;
            } else {
                notGuessedCount++;
            }
        }

        Map<String, Integer> statistics = new HashMap<>();
        statistics.put("Adivinadas", guessedCount);
        statistics.put("No Adivinadas", notGuessedCount);

        return statistics;
    }

    public List<Guess> getGuessesByUserId(Long userId) {
        return guessRepository.findByUserId(userId);
    }

    public List<Guess> getGuessesByWordId(Long wordId) {
        return guessRepository.findByWordId(wordId);
    }

    public Optional<Guess> getGuessByUserIdAndWordId(Long userId, Long wordId) {
        return guessRepository.findById(new AuxId(userId, wordId));
    }

    public Guess createGuess(Guess guess) {
        return guessRepository.save(guess);
    }

    public Guess updateGuess(Long userId, Long wordId, Guess guessDetails) {
        guessDetails.setUserId(userId);
        guessDetails.setWordId(wordId);
        return guessRepository.save(guessDetails);
    }

    public void deleteGuess(Long userId, Long wordId) {
        guessRepository.deleteById(new AuxId(userId, wordId));
    }
}
