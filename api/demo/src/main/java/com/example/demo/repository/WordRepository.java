package com.example.demo.repository;

import com.example.demo.entity.Word;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface WordRepository extends CrudRepository<Word, Long>{
    
}
