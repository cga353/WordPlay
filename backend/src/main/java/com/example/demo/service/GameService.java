package com.example.demo.service;

import com.example.demo.entity.Game;
import com.example.demo.entity.AuxId;
import com.example.demo.repository.GameRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return (List<Game>) gameRepository.findAll();
    }

    public Map<String, Integer> getGameStatistics(Long userId) {
        List<Game> games = getGamesByUserId(userId);
        int guessedCount = 0;
        int notGuessedCount = 0;

        for (Game game : games) {
            if (game.getisGuessed()) {
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

    public List<Game> getSuccessfulGamesByUserId(Long userId) {
        List<Game> guessedGames = new ArrayList<>();
        for (Game game : gameRepository.findByUserId(userId)) {
            if (game.getisGuessed()) {
                guessedGames.add(game);
            }
        }
        return guessedGames;
    }


    public List<Game> getGamesByUserId(Long userId) {
        return gameRepository.findByUserId(userId);
    }

    public List<Game> getGamesByWordId(Long wordId) {
        return gameRepository.findByWordId(wordId);
    }

    public Optional<Game> getGameByUserIdAndWordId(Long userId, Long wordId) {
        return gameRepository.findById(new AuxId(userId, wordId));
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Long userId, Long wordId, Game gameDetails) {
        gameDetails.setUserId(userId);
        gameDetails.setWordId(wordId);
        return gameRepository.save(gameDetails);
    }

    public void deleteGame(Long userId, Long wordId) {
        gameRepository.deleteById(new AuxId(userId, wordId));
    }
}
