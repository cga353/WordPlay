package com.example.demo.repository;

import com.example.demo.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {

    // @Query("SELECT u FROM User u WHERE u.lastName = ?1")
    // List<User> findByLastName(String lastName);

}