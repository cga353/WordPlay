package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.AuxId;
import com.example.demo.entity.Guess;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface GuessRepository extends CrudRepository<Guess, AuxId>{

    List<Guess> findByUserId(Long userId);
    List<Guess> findByWordId(Long wordId);

}
