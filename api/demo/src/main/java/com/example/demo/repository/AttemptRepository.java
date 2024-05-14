package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.AuxId;
import com.example.demo.entity.Attempt;

@RepositoryRestResource
public interface AttemptRepository extends CrudRepository<Attempt, AuxId> {

    List<Attempt> findByUserId(Long userId);
    List<Attempt> findByWordId(Long wordId);

}
