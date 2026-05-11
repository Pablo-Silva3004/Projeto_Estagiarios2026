package com.estagio.crud.repository;

import com.estagio.crud.model.OrdemFornecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdemFornecimentoRepository extends JpaRepository<OrdemFornecimento, Integer> {
}
