package com.estagio.crud.service;

import com.estagio.crud.model.OrdemFornecimento;
import com.estagio.crud.repository.FornecedorRepository;
import com.estagio.crud.repository.OrdemFornecimentoRepository;
import com.estagio.crud.repository.UnidadeRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrdemFornecimentoService {

    private final OrdemFornecimentoRepository ordemRepository;
    private final FornecedorRepository fornecedorRepository;
    private final UnidadeRepository unidadeRepository;
    private final UsuarioRepository usuarioRepository;

    public List<OrdemFornecimento> listarTodas() {
        return ordemRepository.findAll();
    }

    public Optional<OrdemFornecimento> buscarPorId(Integer id) {
        return ordemRepository.findById(id);
    }

    // Cria uma nova ordem vinculando fornecedor, unidade e usuário solicitante pelo ID
    public Optional<OrdemFornecimento> salvar(String numeroOrdem, Integer fornecedorId,
                                              Integer unidadeId, Integer usuarioSolicitanteId,
                                              LocalDate dataEmissao, LocalDate dataEntregaPrevista,
                                              String observacao) {
        return fornecedorRepository.findById(fornecedorId).flatMap(fornecedor ->
            unidadeRepository.findById(unidadeId).flatMap(unidade ->
                usuarioRepository.findById(usuarioSolicitanteId).map(solicitante -> {
                    OrdemFornecimento ordem = new OrdemFornecimento();
                    ordem.setNumeroOrdem(numeroOrdem);
                    ordem.setFornecedor(fornecedor);
                    ordem.setUnidade(unidade);
                    ordem.setUsuarioSolicitante(solicitante);
                    ordem.setDataEmissao(dataEmissao);
                    ordem.setDataEntregaPrevista(dataEntregaPrevista);
                    ordem.setObservacao(observacao);
                    return ordemRepository.save(ordem);
                })
            )
        );
    }

    // Atualiza status, aprovador e observação da ordem
    public Optional<OrdemFornecimento> atualizar(Integer id, OrdemFornecimento.Status status,
                                                 Integer usuarioAprovadorId, String observacao) {
        return ordemRepository.findById(id).map(ordemExistente -> {
            if (status != null) {
                ordemExistente.setStatus(status);
            }
            if (usuarioAprovadorId != null) {
                usuarioRepository.findById(usuarioAprovadorId)
                        .ifPresent(ordemExistente::setUsuarioAprovador);
            }
            ordemExistente.setObservacao(observacao);
            return ordemRepository.save(ordemExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (ordemRepository.existsById(id)) {
            ordemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
