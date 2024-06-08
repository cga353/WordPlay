package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class AuxId implements Serializable {
    /* Atributos de la clase AuxId */

    private Long wordId;
    private Long userId;

    /**
     * Constructor por defecto.
     */
    public AuxId() {
    }

    /**
     * Constructor con parámetros para la clase AuxId.
     * 
     * @param userId El ID del usuario.
     * @param wordId El ID de la palabra.
     */
    public AuxId(Long userId, Long wordId) {
        this.userId = userId;
        this.wordId = wordId;
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
     * Sobrescribe el método equals para comparar objetos de AuxId.
     * 
     * @param o El objeto a comparar.
     * @return true si los objetos son iguales, false en caso contrario.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuxId auxId = (AuxId) o;
        return Objects.equals(wordId, auxId.wordId) && Objects.equals(userId, auxId.userId);
    }

    /**
     * Sobrescribe el método hashCode para proporcionar un hash code consistente para AuxId.
     * 
     * @return El hash code del objeto.
     */
    @Override
    public int hashCode() {
        return Objects.hash(wordId, userId);
    }

}
