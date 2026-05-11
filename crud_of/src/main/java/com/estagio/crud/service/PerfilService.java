package com.estagio.crud.service;

import com.estagio.crud.model.Perfil;
import com.estagio.crud.repository.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PerfilService {

    private final PerfilRepository perfilRepository;

    public List<Perfil> listarTodos() {
        return perfilRepository.findAll();
    }

    public Optional<Perfil> buscarPorId(Integer id) {
        return perfilRepository.findById(id);
    }

    public Perfil salvar(Perfil perfil) {
        return perfilRepository.save(perfil);
    }

    public Optional<Perfil> atualizar(Integer id, Perfil perfilAtualizado) {
        return perfilRepository.findById(id).map(perfilExistente -> {
            perfilExistente.setNome(perfilAtualizado.getNome());
            perfilExistente.setDescricao(perfilAtualizado.getDescricao());
            return perfilRepository.save(perfilExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (perfilRepository.existsById(id)) {
            perfilRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
