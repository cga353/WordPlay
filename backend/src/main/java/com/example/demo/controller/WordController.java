package com.example.demo.controller;

import com.example.demo.entity.Word;
import com.example.demo.service.ExternalApiService;
import com.example.demo.service.WordService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/words")
public class WordController {

    @Autowired
    private WordService wordService;

    private ExternalApiService externalApiService;

    public WordController(ExternalApiService externalApiService) {
        this.externalApiService = externalApiService;
    }

    /**
     * Obtiene todas las palabras.
     *
     * @return Una lista de todas las palabras.
     */
    @GetMapping
    public List<Word> getAllWords() {
        return wordService.getAllWords();
    }

    /**
     * Crea una nueva palabra y obtiene su ID.
     *
     * @param word La palabra a crear.
     * @return El ID de la palabra creada.
     */
    @PostMapping
    public Long createWordAndGetId(@RequestBody Word word) {
        return wordService.createOrUpdateWord(word);
    }

    /**
     * Obtener una palabra aleatoria.
     * 
     * @return ResponseEntity con la palabra aleatoria obtenida.
     */
    @GetMapping("/random")
    public ResponseEntity<String> obtenerPalabraAdivinar() {
        String palabra = externalApiService.getRandomWordAPI();
        return ResponseEntity.ok(palabra);
    }

    /**
     * Busca la palabra en la API.
     * 
     * @param palabra La palabra para la cual se desea obtener la definición.
     * @return ResponseEntity con la definición de la palabra.
     */
    @GetMapping("/definition/{palabra}")
    public ResponseEntity<?> buscarDefinicionPalabra(@PathVariable String palabra) {
        try {
            Object respuesta = externalApiService.searchWordAPI(palabra);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al buscar la definición de la palabra");
        }
    }

    /**
     * Obtiene una palabra por ID.
     *
     * @param id El ID de la palabra.
     * @return La palabra correspondiente al ID.
     */
    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordService.getWordById(id);
    }

    /**
     * Busca una palabra por nombre.
     *
     * @param name El nombre de la palabra.
     * @return La palabra correspondiente al nombre.
     */
    @GetMapping("/search")
    public Word getWordIdByName(@PathVariable String name) {
        return wordService.getWordByName(name);
    }

    /**
     * Actualiza una palabra existente.
     *
     * @param id          El ID de la palabra.
     * @param wordDetails Los nuevos datos de la palabra.
     * @return La palabra actualizada.
     */
    @PutMapping("/{id}")
    public Word updateWord(@PathVariable Long id, @RequestBody Word wordDetails) {
        return wordService.updateWord(id, wordDetails);
    }

    /**
     * Elimina una palabra.
     *
     * @param id El ID de la palabra.
     */
    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordService.deleteWord(id);
    }
}
