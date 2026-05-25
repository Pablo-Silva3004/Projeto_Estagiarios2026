package com.estagio.resource;

import com.estagio.dto.UsuarioDTO;
import com.estagio.entity.Usuario;
import com.estagio.service.UsuarioService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/usuarios")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    @Inject
    UsuarioService usuarioService;

    /*
     * GET /usuarios
     */
    @GET
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    /*
     * GET /usuarios/{id}
     */
    @GET
    @Path("/{id}")
    public Usuario buscarPorId(@PathParam("id") Long id) {
        return usuarioService.buscarPorId(id);
    }

    /*
     * POST /usuarios
     */
    @POST
    public Response criar(UsuarioDTO dto) {

        Usuario usuario = usuarioService.criar(dto);

        return Response
                .status(Response.Status.CREATED)
                .entity(usuario)
                .build();
    }

    /*
     * PUT /usuarios/{id}
     */
    @PUT
    @Path("/{id}")
    public Usuario atualizar(
            @PathParam("id") Long id,
            UsuarioDTO dto
    ) {

        return usuarioService.atualizar(id, dto);
    }

    /*
     * DELETE /usuarios/{id}
     */
    @DELETE
    @Path("/{id}")
    public Response deletar(@PathParam("id") Long id) {

        usuarioService.deletar(id);

        return Response.noContent().build();
    }
}