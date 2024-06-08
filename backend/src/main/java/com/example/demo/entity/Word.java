package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "words")
public class Word {

    /* Atributos de la clase Word */
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    /**
     * Constructor por defecto.
     */
    public Word() {
    }

    /**
     * Constructor con parámetro name.
     * 
     * @param name el nombre de la palabra
     */
    public Word(String name) {
        this.name = name;
    }

    /**
     * Obtiene el ID de la palabra.
     * 
     * @return el ID de la palabra
     */
    public long getId() {
        return id;
    }

    /**
     * Establece el ID de la palabra.
     * 
     * @param id el ID de la palabra
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre de la palabra.
     * 
     * @return el nombre de la palabra
     */
    public String getName() {
        return name;
    }

    /**
     * Establece el nombre de la palabra.
     * 
     * @param name el nombre de la palabra
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Devuelve una representación en cadena de la palabra.
     * 
     * @return una representación en cadena de la palabra
     */
    @Override
    public String toString() {
        return "Word [id=" + id + ", name=" + name + "]";
    }
}
