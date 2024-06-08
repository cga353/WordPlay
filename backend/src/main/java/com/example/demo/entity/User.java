package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {

    /* Atributos de la clase User */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "UserName is mandatory")
    private String userName;

    @NotBlank(message = "Email is mandatory")
    @Email
    private String email;
    
    @NotBlank(message = "Password is mandatory")
    private String password;

    /**
     * Constructor por defecto para la clase User.
     */
    public User() {
    }

    /**
     * Constructor para la clase User con parámetros.
     * 
     * @param userName El nombre de usuario del usuario.
     * @param email    El correo electrónico del usuario.
     * @param password La contraseña del usuario.
     */
    public User(String userName, String email, String password) {
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    /**
     * Obtiene el ID del usuario.
     * 
     * @return El ID del usuario.
     */
    public long getId() {
        return id;
    }

    /**
     * Establece el ID del usuario.
     * 
     * @param id El ID del usuario.
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre de usuario del usuario.
     * 
     * @return El nombre de usuario del usuario.
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Establece el nombre de usuario del usuario.
     * 
     * @param userName El nombre de usuario del usuario.
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     * 
     * @return El correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Establece el correo electrónico del usuario.
     * 
     * @param email El correo electrónico del usuario.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Establece el correo electrónico del usuario.
     * 
     * @param email El correo electrónico del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     * 
     * @param password La contraseña del usuario.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene una representación en cadena del objeto User.
     * 
     * @return Una representación en cadena del objeto User.
     */
    @Override
    public String toString() {
        return "User [id=" + id + ", userName=" + userName + ", email=" + email + "]";
    }

}