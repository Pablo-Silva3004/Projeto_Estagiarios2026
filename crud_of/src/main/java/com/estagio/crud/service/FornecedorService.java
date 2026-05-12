package com.estagio.crud.service;

import com.estagio.crud.model.Fornecedor;
import com.estagio.crud.repository.FornecedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    public List<Fornecedor> listarTodos() {
        return fornecedorRepository.findAll();
    }

    public Optional<Fornecedor> buscarPorId(Integer id) {
        return fornecedorRepository.findById(id);
    }

    // Cria um novo fornecedor
    public Fornecedor salvar(String nome, String cnpj, String telefone,
                             String email, String endereco) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNome(nome);
        fornecedor.setCnpj(cnpj);
        fornecedor.setTelefone(telefone);
        fornecedor.setEmail(email);
        fornecedor.setEndereco(endereco);
        return fornecedorRepository.save(fornecedor);
    }

    // Atualiza um fornecedor existente
    public Optional<Fornecedor> atualizar(Integer id, String nome, String cnpj,
                                          String telefone, String email, String endereco,
                                          Boolean ativo) {
        return fornecedorRepository.findById(id).map(fornecedorExistente -> {
            fornecedorExistente.setNome(nome);
            fornecedorExistente.setCnpj(cnpj);
            fornecedorExistente.setTelefone(telefone);
            fornecedorExistente.setEmail(email);
            fornecedorExistente.setEndereco(endereco);
            if (ativo != null) fornecedorExistente.setAtivo(ativo);
            return fornecedorRepository.save(fornecedorExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (fornecedorRepository.existsById(id)) {
            fornecedorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
