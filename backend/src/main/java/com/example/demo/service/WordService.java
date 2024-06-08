package com.example.demo.service;

import com.example.demo.entity.Word;
import com.example.demo.repository.WordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WordService {

    @Autowired
    private WordRepository wordRepository;

    public List<Word> getAllWords() {
        return (List<Word>) wordRepository.findAll();
    }

    public Word getWordById(Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    public Long createOrUpdateWord(Word word) {
        Optional<Word> existingWord = wordRepository.findByName(word.getName());
        if (existingWord.isPresent()) {
            return existingWord.get().getId();
        } else {
            return wordRepository.save(word).getId();
        }
    }

    public Word updateWord(Long id, Word wordDetails) {
        Optional<Word> wordOptional = wordRepository.findById(id);
        if (wordOptional.isPresent()) {
            Word word = wordOptional.get();
            word.setName(wordDetails.getName());
            return wordRepository.save(word);
        }
        return null;
    }

    public void deleteWord(Long id) {
        wordRepository.deleteById(id);
    }

    public Word getWordByName(String name) {
        return wordRepository.findByName(name).orElse(null);
    }
}
