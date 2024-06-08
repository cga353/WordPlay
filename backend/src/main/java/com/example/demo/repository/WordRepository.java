package com.example.demo.repository;

import com.example.demo.entity.Word;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface WordRepository extends CrudRepository<Word, Long>{
    Optional<Word> findByName(String name);

}
