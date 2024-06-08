package com.example.demo.controller;

import com.example.demo.entity.Guess;
import com.example.demo.service.GuessService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/guesses")
public class GuessController {

    @Autowired
    private GuessService guessService;

    /**
     * Obtiene todos los intentos.
     *
     * @return Una lista de todos los intentos.
     */
    @GetMapping
    public List<Guess> getAllGuesses() {
        return guessService.getAllGuesses();
    }

    /**
     * Crea un nuevo intento.
     *
     * @param guess El intento a crear.
     * @return El intento creado.
     */
    @PostMapping
    public Guess createGuess(@RequestBody Guess guess) {
        return guessService.createGuess(guess);
    }

    /**
     * Obtiene estadísticas de intentos por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Un mapa con las estadísticas de los intentos del usuario.
     */
    @GetMapping("/statistics/{userId}")
    public Map<String, Integer> getGuessStatistics(@PathVariable Long userId) {
        return guessService.getGuessStatistics(userId);
    }

    /**
     * Obtiene los intentos exitosos por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de los intentos exitosos del usuario.
     */
    @GetMapping("/successes/{userId}")
    public List<Guess> getSuccessfulGuessesByUserId(@PathVariable Long userId) {
        return guessService.getSuccessfulGuessesByUserId(userId);
    }

    /**
     * Obtiene los intentos por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de intentos del usuario.
     */
    @GetMapping("/user/{userId}")
    public List<Guess> getGuessesByUserId(@PathVariable Long userId) {
        return guessService.getGuessesByUserId(userId);
    }

    /**
     * Obtiene los intentos por ID de palabra.
     *
     * @param wordId El ID de la palabra.
     * @return Una lista de intentos de la palabra.
     */
    @GetMapping("/word/{wordId}")
    public List<Guess> getGuessesByWordId(@PathVariable Long wordId) {
        return guessService.getGuessesByWordId(wordId);
    }

    /**
     * Obtiene el intento por ID de usuario e ID de palabra.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @return El intento correspondiente al usuario y palabra.
     */
    @GetMapping("/{userId}/{wordId}")
    public Optional<Guess> getGuessByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return guessService.getGuessByUserIdAndWordId(userId, wordId);
    }

    /**
     * Actualiza un intento existente.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @param guess  El intento con los nuevos datos.
     * @return El intento actualizado.
     */
    @PutMapping("/{userId}/{wordId}")
    public Guess updateGuess(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Guess guess) {
        return guessService.updateGuess(userId, wordId, guess);
    }

    /**
     * Elimina un intento.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     */
    @DeleteMapping("/{userId}/{wordId}")
    public void deleteGuess(@PathVariable Long userId, @PathVariable Long wordId) {
        guessService.deleteGuess(userId, wordId);
    }
}
