package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.AuxId;
import com.example.demo.entity.Game;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface GameRepository extends CrudRepository<Game, AuxId>{

    List<Game> findByUserId(Long userId);
    List<Game> findByWordId(Long wordId);

}
