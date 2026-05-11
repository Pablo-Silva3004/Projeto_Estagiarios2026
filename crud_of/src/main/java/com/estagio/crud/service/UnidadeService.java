package com.estagio.crud.service;

import com.estagio.crud.model.Unidade;
import com.estagio.crud.repository.UnidadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UnidadeService {

    private final UnidadeRepository unidadeRepository;

    public List<Unidade> listarTodos() {
        return unidadeRepository.findAll();
    }

    public Optional<Unidade> buscarPorId(Integer id) {
        return unidadeRepository.findById(id);
    }

    // Cria uma nova unidade
    public Unidade salvar(String nome, String sigla) {
        Unidade unidade = new Unidade();
        unidade.setNome(nome);
        unidade.setSigla(sigla);
        return unidadeRepository.save(unidade);
    }

    // Atualiza uma unidade existente
    public Optional<Unidade> atualizar(Integer id, String nome, String sigla) {
        return unidadeRepository.findById(id).map(unidadeExistente -> {
            unidadeExistente.setNome(nome);
            unidadeExistente.setSigla(sigla);
            return unidadeRepository.save(unidadeExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (unidadeRepository.existsById(id)) {
            unidadeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
