package com.estagio.crud.service;

import com.estagio.crud.model.HistoricoStatusOf;
import com.estagio.crud.repository.HistoricoStatusOfRepository;
import com.estagio.crud.repository.OrdemFornecimentoRepository;
import com.estagio.crud.repository.StatusOfRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HistoricoStatusOfService {

    private final HistoricoStatusOfRepository historicoRepository;
    private final OrdemFornecimentoRepository ordemRepository;
    private final StatusOfRepository statusOfRepository;
    private final UsuarioRepository usuarioRepository;

    public List<HistoricoStatusOf> listarTodos() {
        return historicoRepository.findAll();
    }

    public Optional<HistoricoStatusOf> buscarPorId(Integer id) {
        return historicoRepository.findById(id);
    }

    // Registra uma mudança de status em uma ordem de fornecimento
    // statusAnteriorId pode ser nulo (primeiro registro de status)
    public Optional<HistoricoStatusOf> registrar(Integer ordemId, Integer statusAnteriorId,
                                                  Integer statusNovoId, Integer alteradoPorId,
                                                  String observacao) {
        return ordemRepository.findById(ordemId).flatMap(ordem ->
            statusOfRepository.findById(statusNovoId).flatMap(statusNovo ->
                usuarioRepository.findById(alteradoPorId).map(alteradoPor -> {
                    HistoricoStatusOf historico = new HistoricoStatusOf();
                    historico.setOrdemFornecimento(ordem);
                    historico.setStatusNovo(statusNovo);
                    historico.setAlteradoPor(alteradoPor);
                    historico.setObservacao(observacao);

                    // statusAnterior é opcional
                    if (statusAnteriorId != null) {
                        statusOfRepository.findById(statusAnteriorId)
                                .ifPresent(historico::setStatusAnterior);
                    }

                    return historicoRepository.save(historico);
                })
            )
        );
    }
}
