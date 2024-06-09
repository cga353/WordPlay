package com.example.demo.controller;

import com.example.demo.entity.Game;
import com.example.demo.service.GameService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService gameService;

    /**
     * Obtiene todas partidas.
     *
     * @return Una lista de todas las partidas.
     */
    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    /**
     * Crea una nueva partida.
     *
     * @param game El intento a crear.
     * @return El intento creado.
     */
    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameService.createGame(game);
    }

    /**
     * Obtiene el número de juegos ganados y perdidos por el usuario.
     * 
     * @param userId El ID del usuario.
     * @return Un mapa con las estadísticas de las partidas del usuario.
     */
    @GetMapping("/statistics/{userId}")
    public Map<String, Integer> getGameStatistics(@PathVariable Long userId) {
        return gameService.getGameStatistics(userId);
    }

    /**
     * Obtiene las partidas ganadas por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de las partidas ganadas del usuario.
     */
    @GetMapping("/successes/{userId}")
    public List<Game> getSuccessfulGamesByUserId(@PathVariable Long userId) {
        return gameService.getSuccessfulGamesByUserId(userId);
    }

    /**
     * Obtiene las partidas por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de las partidas del usuario.
     */
    @GetMapping("/user/{userId}")
    public List<Game> getGamesByUserId(@PathVariable Long userId) {
        return gameService.getGamesByUserId(userId);
    }

    /**
     * Obtiene las partidas por ID de palabra.
     *
     * @param wordId El ID de la palabra.
     * @return Una lista de juegos de la palabra.
     */
    @GetMapping("/word/{wordId}")
    public List<Game> getGamesByWordId(@PathVariable Long wordId) {
        return gameService.getGamesByWordId(wordId);
    }

    /**
     * Obtiene la parrtida por ID de usuario e ID de palabra.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @return La partida correspondiente al usuario y palabra.
     */
    @GetMapping("/{userId}/{wordId}")
    public Optional<Game> getGameByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return gameService.getGameByUserIdAndWordId(userId, wordId);
    }

    /**
     * Actualiza una partida existente.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @param game  La partida con los nuevos datos.
     * @return La partida actualizada.
     */
    @PutMapping("/{userId}/{wordId}")
    public Game updateGame(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Game game) {
        return gameService.updateGame(userId, wordId, game);
    }

    /**
     * Elimina una partida.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     */
    @DeleteMapping("/{userId}/{wordId}")
    public void deleteGame(@PathVariable Long userId, @PathVariable Long wordId) {
        gameService.deleteGame(userId, wordId);
    }
}
