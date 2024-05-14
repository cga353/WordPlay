package com.example.demo.entity;

import java.io.Serializable;

public class AuxId implements Serializable{
    
    private Long wordId;
    private Long userId;

    public AuxId() {
    }

    public AuxId(Long userId, Long wordId) {
        this.userId = userId;
        this.wordId = wordId;
    }

    public Long getWordId() {
        return wordId;
    }

    public void setWordId(Long wordId) {
        this.wordId = wordId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
