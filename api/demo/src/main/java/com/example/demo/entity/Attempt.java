package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "attempts")
@IdClass(AuxId.class)
public class Attempt {

    @Id
    private Long wordId;

    @Id
    private Long userId;

    @NotNull(message = "Number of attempts is mandatory")
    private int nVeces;

    // Constructor vacío
    public Attempt() {
    }

    // Constructor con todos los campos
    public Attempt(Long userId, Long wordId, int nVeces) {
        this.userId = userId;
        this.wordId = wordId;
        this.nVeces = nVeces;
    }

    // Getters y Setters
    public int getnVeces() {
        return nVeces;
    }
    
    public void setnVeces(int nVeces) {
        this.nVeces = nVeces;
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
