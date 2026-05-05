package com.estagio.crud.repository;

import com.estagio.crud.model.HistoricoStatusOf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoStatusOfRepository extends JpaRepository<HistoricoStatusOf, Integer> {
}
