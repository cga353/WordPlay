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

    /* Atributos de la clase Guess */

    @Id
    private Long wordId;

    @Id
    private Long userId;

    @NotNull(message = "IsGuessed field is mandatory")
    private boolean isGuessed;

    @NotNull(message = "Number of attempts is mandatory")
    private int nAttempt;

    private Date date;

    /**
     * Constructor por defecto.
     */
    public Guess() {
    }

    /**
     * Constructor con parámetros para la clase Guess.
     * 
     * @param userId    El ID del usuario.
     * @param wordId    El ID de la palabra.
     * @param isGuessed Indica si la palabra fue adivinada.
     * @param nAttempt  El número de intentos.
     * @param date      La fecha del intento.
     */
    public Guess(Long userId, Long wordId, boolean isGuessed, int nAttempt, Date date) {
        this.userId = userId;
        this.wordId = wordId;
        this.isGuessed = isGuessed;
        this.nAttempt = nAttempt;
        this.date = date;
    }

    /**
     * Obtiene el ID de la palabra.
     * 
     * @return El ID de la palabra.
     */
    public Long getWordId() {
        return wordId;
    }

    /**
     * Establece el ID de la palabra.
     * 
     * @param wordId El ID de la palabra.
     */
    public void setWordId(Long wordId) {
        this.wordId = wordId;
    }

    /**
     * Obtiene el ID del usuario.
     * 
     * @return El ID del usuario.
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Establece el ID del usuario.
     * 
     * @param userId El ID del usuario.
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Obtiene si la palabra fue adivinada.
     * 
     * @return true si la palabra fue adivinada, false en caso contrario.
     */
    public boolean getisGuessed() {
        return isGuessed;
    }

    /**
     * Establece si la palabra fue adivinada.
     * 
     * @param isGuessed true si la palabra fue adivinada, false en caso contrario.
     */
    public void setGuessed(boolean isGuessed) {
        this.isGuessed = isGuessed;
    }

    /**
     * Obtiene el número de intentos.
     * 
     * @return El número de intentos.
     */
    public Integer getnAttempt() {
        return nAttempt;
    }

    /**
     * Establece el número de intentos.
     * 
     * @param nAttempt El número de intentos.
     */
    public void setnAttempt(Integer nAttempt) {
        this.nAttempt = nAttempt;
    }

    /**
     * Obtiene la fecha del intento.
     * 
     * @return La fecha del intento.
     */
    public Date getDate() {
        return date;
    }

    /**
     * Establece la fecha del intento.
     * 
     * @param date La fecha del intento.
     */
    public void setDate(Date date) {
        this.date = date;
    }

}
