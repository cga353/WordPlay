package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TranslationDTO;
import com.example.demo.service.TranslationDataService;

@RestController
@RequestMapping("/translation")
public class TranslationController {
    
    @Autowired
    private TranslationDataService translationDataService;

    @GetMapping("/{word}")
    public List<TranslationDTO> getTranslation(@PathVariable String word) {
        return translationDataService.retrieveTranslationData(word);
    }

}
