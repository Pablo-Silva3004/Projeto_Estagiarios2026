package com.estagio.crud.service;

import com.estagio.crud.model.OrdemFornecimento;
import com.estagio.crud.repository.ColaboradorRepository;
import com.estagio.crud.repository.OrdemFornecimentoRepository;
import com.estagio.crud.repository.StatusOfRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrdemFornecimentoService {

    private final OrdemFornecimentoRepository ordemRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final StatusOfRepository statusOfRepository;
    private final UsuarioRepository usuarioRepository;

    public List<OrdemFornecimento> listarTodas() {
        return ordemRepository.findAll();
    }

    public Optional<OrdemFornecimento> buscarPorId(Integer id) {
        return ordemRepository.findById(id);
    }

    // Cria uma nova ordem vinculada a um colaborador, status inicial e usuário criador
    public Optional<OrdemFornecimento> salvar(String descricao, String numeroOf,
                                              Integer colaboradorId, Integer statusId,
                                              Integer competenciaMes, Integer competenciaAno,
                                              Integer criadoPorId) {
        return colaboradorRepository.findById(colaboradorId).flatMap(colaborador ->
            statusOfRepository.findById(statusId).flatMap(status ->
                usuarioRepository.findById(criadoPorId).map(criadoPor -> {
                    OrdemFornecimento ordem = new OrdemFornecimento();
                    ordem.setDescricao(descricao);
                    ordem.setNumeroOf(numeroOf);
                    ordem.setColaborador(colaborador);
                    ordem.setStatus(status);
                    ordem.setCompetenciaMes(competenciaMes);
                    ordem.setCompetenciaAno(competenciaAno);
                    ordem.setCriadoPor(criadoPor);
                    return ordemRepository.save(ordem);
                })
            )
        );
    }

    // Atualiza descrição e status da ordem
    public Optional<OrdemFornecimento> atualizar(Integer id, String descricao, Integer statusId) {
        return ordemRepository.findById(id).flatMap(ordem ->
            statusOfRepository.findById(statusId).map(status -> {
                ordem.setDescricao(descricao);
                ordem.setStatus(status);
                return ordemRepository.save(ordem);
            })
        );
    }

    public boolean deletar(Integer id) {
        if (ordemRepository.existsById(id)) {
            ordemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
