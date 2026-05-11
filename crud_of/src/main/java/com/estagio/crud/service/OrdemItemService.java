package com.estagio.crud.service;

import com.estagio.crud.model.OrdemItem;
import com.estagio.crud.repository.OrdemFornecimentoRepository;
import com.estagio.crud.repository.OrdemItemRepository;
import com.estagio.crud.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrdemItemService {

    private final OrdemItemRepository ordemItemRepository;
    private final OrdemFornecimentoRepository ordemFornecimentoRepository;
    private final ProdutoRepository produtoRepository;

    public List<OrdemItem> listarTodos() {
        return ordemItemRepository.findAll();
    }

    public Optional<OrdemItem> buscarPorId(Integer id) {
        return ordemItemRepository.findById(id);
    }

    // Cria um novo item vinculando ordem e produto pelo ID
    public Optional<OrdemItem> salvar(Integer ordemId, Integer produtoId,
                                      BigDecimal quantidade, BigDecimal valorUnitario) {
        return ordemFornecimentoRepository.findById(ordemId).flatMap(ordem ->
            produtoRepository.findById(produtoId).map(produto -> {
                OrdemItem item = new OrdemItem();
                item.setOrdem(ordem);
                item.setProduto(produto);
                item.setQuantidade(quantidade);
                item.setValorUnitario(valorUnitario);
                return ordemItemRepository.save(item);
            })
        );
    }

    // Atualiza quantidade recebida e valor unitário de um item
    public Optional<OrdemItem> atualizar(Integer id, BigDecimal quantidade,
                                         BigDecimal valorUnitario,
                                         BigDecimal quantidadeRecebida) {
        return ordemItemRepository.findById(id).map(itemExistente -> {
            itemExistente.setQuantidade(quantidade);
            itemExistente.setValorUnitario(valorUnitario);
            itemExistente.setQuantidadeRecebida(quantidadeRecebida != null ? quantidadeRecebida : BigDecimal.ZERO);
            return ordemItemRepository.save(itemExistente);
        });
    }

    public boolean deletar(Integer id) {
        if (ordemItemRepository.existsById(id)) {
            ordemItemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
