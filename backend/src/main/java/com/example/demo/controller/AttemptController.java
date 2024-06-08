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

    /**
     * Obtiene todos los intentos.
     *
     * @return Una lista de todos los intentos.
     */
    @GetMapping
    public List<Attempt> getAllAttempts() {
        return attemptService.getAllAttempts();
    }

    /**
     * Crea un nuevo intento.
     *
     * @param attempt El intento a crear.
     * @return El intento creado.
     */
    @PostMapping
    public Attempt createAttempt(@RequestBody Attempt attempt) {
        return attemptService.createAttempt(attempt);
    }

    /**
     * Obtiene los 5 mejores intentos por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de los 5 mejores intentos del usuario.
     */
    @GetMapping("/top5/user/{userId}")
    public List<Attempt> getTop5AttemptsByUserId(@PathVariable Long userId) {
        return attemptService.getTop5AttemptsByUserId(userId);
    }

    /**
     * Obtiene los intentos por ID de usuario.
     *
     * @param userId El ID del usuario.
     * @return Una lista de intentos del usuario.
     */
    @GetMapping("/user/{userId}")
    public List<Attempt> getAttemptsByUserId(@PathVariable Long userId) {
        return attemptService.getAttemptsByUserId(userId);
    }

    /**
     * Obtiene los intentos por ID de palabra.
     *
     * @param wordId El ID de la palabra.
     * @return Una lista de intentos de la palabra.
     */
    @GetMapping("/word/{wordId}")
    public List<Attempt> getAttemptsByWordId(@PathVariable Long wordId) {
        return attemptService.getAttemptsByWordId(wordId);
    }

    /**
     * Obtiene el intento por ID de usuario e ID de palabra.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @return El intento correspondiente al usuario y palabra.
     */
    @GetMapping("/{userId}/{wordId}")
    public Optional<Attempt> getAttemptByUserIdAndWordId(@PathVariable Long userId, @PathVariable Long wordId) {
        return attemptService.getAttemptByUserIdAndWordId(userId, wordId);
    }

    /**
     * Actualiza un intento existente.
     *
     * @param userId  El ID del usuario.
     * @param wordId  El ID de la palabra.
     * @param attempt El intento con los nuevos datos.
     * @return El intento actualizado.
     */
    @PutMapping("/{userId}/{wordId}")
    public Attempt updateAttempt(@PathVariable Long userId, @PathVariable Long wordId, @RequestBody Attempt attempt) {
        return attemptService.updateAttempt(userId, wordId, attempt);
    }

    /**
     * Elimina un intento.
     *
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     */
    @DeleteMapping("/{userId}/{wordId}")
    public void deleteAttempt(@PathVariable Long userId, @PathVariable Long wordId) {
        attemptService.deleteAttempt(userId, wordId);
    }
}
