package com.estagio.crud.repository;

import com.estagio.crud.model.StatusOf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusOfRepository extends JpaRepository<StatusOf, Integer> {
}
