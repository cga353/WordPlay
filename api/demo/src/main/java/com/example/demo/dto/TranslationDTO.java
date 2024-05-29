package com.example.demo.dto;

public class TranslationDTO {
    public String name;
    public String text;

    public TranslationDTO(String name, String text) {
        this.name = name;
        this.text = text;
    }

    public TranslationDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
