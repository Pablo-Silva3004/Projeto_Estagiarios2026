package com.estagio.crud.repository;

import com.estagio.crud.model.OrdemItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdemItemRepository extends JpaRepository<OrdemItem, Integer> {
}
