package com.example.demo.controller;

import com.example.demo.entity.Word;
import com.example.demo.service.WordService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/words") 
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping
    public List<Word> getAllWords() {
        return wordService.getAllWords();
    }

    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordService.getWordById(id);
    }

    @GetMapping("/search")
    public Word getWordIdByName(@PathVariable String name) {
        return wordService.getWordByName(name);
    }

    @PostMapping
    public Long createWordAndGetId(@RequestBody Word word) {
        return wordService.createOrUpdateWord(word);
    }

    @PutMapping("/{id}")
    public Word updateWord(@PathVariable Long id, @RequestBody Word wordDetails) {
        return wordService.updateWord(id, wordDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordService.deleteWord(id);
    }
}
