package com.example.demo.controller;

import com.example.demo.entity.Word;
import com.example.demo.repository.WordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/words") 
public class WordController {

    @Autowired
    private WordRepository wordRepository;

    // Ruta GET para obtener todos los palabras
    @GetMapping
    public List<Word> getAllWords() {
        return (List<Word>) wordRepository.findAll();
    }

    // Ruta GET para obtener un palabra por su ID
    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    // Ruta POST para crear un nuevo palabra
    @PostMapping
    public Word createWord(@RequestBody Word Word) {
        return wordRepository.save(Word);
    }

    // Ruta PUT para actualizar un palabra existente
    @PutMapping("/{id}")
    public Word updateWord(@PathVariable Long id, @RequestBody Word WordDetails) {
        Word Word = wordRepository.findById(id).orElse(null);
        if (Word != null) {
            Word.setName(WordDetails.getName());
            return wordRepository.save(Word);
        }
        return null;
    }

    // Ruta DELETE para eliminar una palabra por su ID
    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
    }
}
