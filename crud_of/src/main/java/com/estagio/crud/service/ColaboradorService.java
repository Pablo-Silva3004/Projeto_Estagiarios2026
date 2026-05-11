package com.estagio.crud.service;

import com.estagio.crud.model.Colaborador;
import com.estagio.crud.repository.ColaboradorRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColaboradorService {

    private final ColaboradorRepository colaboradorRepository;
    // RT e Gerente agora são usuários comuns — não há mais tabelas separadas para eles
    private final UsuarioRepository usuarioRepository;

    public List<Colaborador> listarTodos() {
        return colaboradorRepository.findAll();
    }

    public Optional<Colaborador> buscarPorId(Integer id) {
        return colaboradorRepository.findById(id);
    }

    // Cria um colaborador vinculando RT, Gerente e o usuário que está criando
    public Optional<Colaborador> salvar(String nome, String email,
                                        Integer rtId, Integer gerenteId, Integer criadoPorId) {
        // Busca os usuários no banco; se todos existirem, cria o colaborador
        return usuarioRepository.findById(rtId).flatMap(rt ->
            usuarioRepository.findById(gerenteId).flatMap(gerente ->
                usuarioRepository.findById(criadoPorId).map(criadoPor -> {
                    Colaborador colaborador = new Colaborador();
                    colaborador.setNome(nome);
                    colaborador.setEmail(email);
                    colaborador.setRt(rt);
                    colaborador.setGerente(gerente);
                    colaborador.setCriadoPor(criadoPor);
                    return colaboradorRepository.save(colaborador);
                })
            )
        );
    }

    public Optional<Colaborador> atualizar(Integer id, String nome, String email,
                                           Integer rtId, Integer gerenteId) {
        return colaboradorRepository.findById(id).flatMap(colab ->
            usuarioRepository.findById(rtId).flatMap(rt ->
                usuarioRepository.findById(gerenteId).map(gerente -> {
                    colab.setNome(nome);
                    colab.setEmail(email);
                    colab.setRt(rt);
                    colab.setGerente(gerente);
                    return colaboradorRepository.save(colab);
                })
            )
        );
    }

    public boolean deletar(Integer id) {
        if (colaboradorRepository.existsById(id)) {
            colaboradorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
