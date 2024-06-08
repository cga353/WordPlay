package com.example.demo.dto;

public class TranslationDTO {

    /* Atributos de TranslationDTO */

    public String name;
    public String text;

    /**
     * Constructor por defecto.
     */
    public TranslationDTO() {
    }

    /**
     * Constructor con parámetros para inicializar los campos.
     *
     * @param name Nombre de la palabra a traducir.
     * @param text Texto traducido.
     */
    public TranslationDTO(String name, String text) {
        this.name = name;
        this.text = text;
    }

    /**
     * Obtiene el nombre de la palabra a traducir.
     *
     * @return El nombre de la palabra a traducir.
     */
    public String getName() {
        return name;
    }

    /**
     * Establece el nombre de la palabra a traducir.
     *
     * @param name El nombre de la palabra a traducir.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Obtiene el texto traducido.
     *
     * @return El texto traducido.
     */
    public String getText() {
        return text;
    }

    /**
     * Establece el texto traducido.
     *
     * @param text El texto traducido.
     */
    public void setText(String text) {
        this.text = text;
    }

}
