package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.AuxId;
import com.example.demo.entity.Attempt;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface AttemptRepository extends CrudRepository<Attempt, AuxId> {

    List<Attempt> findByUserId(Long userId);
    List<Attempt> findByWordId(Long wordId);

    @Query("SELECT a FROM Attempt a WHERE a.userId = :userId ORDER BY a.nVeces DESC")
    List<Attempt> findTop5ByUserIdOrderByNVecesDesc(Long userId, Pageable pageable);

}
