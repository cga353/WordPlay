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

    /* Atributos de la clase Attempt */

    @Id
    private Long wordId;

    @Id
    private Long userId;

    @NotNull(message = "Number of attempts is mandatory")
    private int nVeces;

    /**
     * Constructor por defecto.
     */
    public Attempt() {
    }

    /**
     * Constructor con parámetros para la clase Attempt.
     * 
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     * @param nVeces El número de intentos.
     */
    public Attempt(Long userId, Long wordId, int nVeces) {
        this.userId = userId;
        this.wordId = wordId;
        this.nVeces = nVeces;
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
     * Obtiene el número de intentos.
     * 
     * @return El número de intentos.
     */
    public int getnVeces() {
        return nVeces;
    }

    /**
     * Establece el número de intentos.
     * 
     * @param nVeces El número de intentos.
     */
    public void setnVeces(int nVeces) {
        this.nVeces = nVeces;
    }

}
