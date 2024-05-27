package com.example.demo.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "guesses")
@IdClass(AuxId.class)
public class Guess {

    @Id
    private Long wordId;

    @Id
    private Long userId;

    @NotNull(message = "IsGuessed field is mandatory")
    private boolean isGuessed;

    @NotNull(message = "Number of attempts is mandatory")
    private int nAttempt;

    private Date date;

    // Constructor vacío
    public Guess() {
    }

    // Constructor con todos los campos
    public Guess(Long userId, Long wordId, boolean isGuessed, int nAttempt, Date date) {
        this.userId = userId;
        this.wordId = wordId;
        this.isGuessed = isGuessed;
        this.nAttempt = nAttempt;
        this.date = date;
    }

    // Getters y Setters
    public boolean getisGuessed() {
        return isGuessed;
    }

    public void setGuessed(boolean isGuessed) {
        this.isGuessed = isGuessed;
    }

    public Integer getnAttempt() {
        return nAttempt;
    }

    public void setnAttempt(Integer nAttempt) {
        this.nAttempt = nAttempt;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
