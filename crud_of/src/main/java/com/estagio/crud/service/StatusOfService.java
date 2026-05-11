package com.estagio.crud.service;

import com.estagio.crud.model.StatusOf;
import com.estagio.crud.repository.StatusOfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StatusOfService {

    private final StatusOfRepository statusOfRepository;

    public List<StatusOf> listarTodos() {
        return statusOfRepository.findAll();
    }

    public Optional<StatusOf> buscarPorId(Integer id) {
        return statusOfRepository.findById(id);
    }

    public StatusOf salvar(StatusOf statusOf) {
        return statusOfRepository.save(statusOf);
    }

    public Optional<StatusOf> atualizar(Integer id, StatusOf statusAtualizado) {
        return statusOfRepository.findById(id).map(statusExistente -> {
            statusExistente.setNome(statusAtualizado.getNome());
            statusExistente.setDescricao(statusAtualizado.getDescricao());
            statusExistente.setOrdem(statusAtualizado.getOrdem());
            statusExistente.setFinalizador(statusAtualizado.getFinalizador());
            return statusOfRepository.save(statusExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (statusOfRepository.existsById(id)) {
            statusOfRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
