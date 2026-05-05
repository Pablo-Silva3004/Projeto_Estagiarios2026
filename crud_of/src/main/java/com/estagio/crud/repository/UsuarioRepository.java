package com.estagio.crud.repository;

import com.estagio.crud.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// @Repository: marca esta interface como um componente de acesso ao banco
// JpaRepository<Entidade, TipoDoId>: já vem com findAll, findById, save, delete etc.
// Você não precisa escrever nenhum SQL para as operações básicas!
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // O Spring Data JPA cria a implementação automaticamente
    // Você pode adicionar métodos personalizados aqui se precisar
    // Exemplo: List<Usuario> findByFuncao(Usuario.Funcao funcao);
}
