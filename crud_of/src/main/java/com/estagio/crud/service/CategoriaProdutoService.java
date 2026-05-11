package com.estagio.crud.service;

import com.estagio.crud.model.CategoriaProduto;
import com.estagio.crud.repository.CategoriaProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriaProdutoService {

    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public List<CategoriaProduto> listarTodos() {
        return categoriaProdutoRepository.findAll();
    }

    public Optional<CategoriaProduto> buscarPorId(Integer id) {
        return categoriaProdutoRepository.findById(id);
    }

    // Cria uma nova categoria
    public CategoriaProduto salvar(String nome) {
        CategoriaProduto categoria = new CategoriaProduto();
        categoria.setNome(nome);
        return categoriaProdutoRepository.save(categoria);
    }

    // Atualiza o nome de uma categoria existente
    public Optional<CategoriaProduto> atualizar(Integer id, String nome) {
        return categoriaProdutoRepository.findById(id).map(categoriaExistente -> {
            categoriaExistente.setNome(nome);
            return categoriaProdutoRepository.save(categoriaExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (categoriaProdutoRepository.existsById(id)) {
            categoriaProdutoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
