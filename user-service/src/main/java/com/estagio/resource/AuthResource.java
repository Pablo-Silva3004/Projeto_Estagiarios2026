package com.estagio.resource;

import com.estagio.dto.LoginDTO;
import com.estagio.dto.LoginRequest;
import com.estagio.dto.LoginRequest;
import com.estagio.service.AuthService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;


@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    public Response login(LoginDTO request) {
        String token = authService.login(request);

        return Response.ok(
                Map.of("token", token)
        ).build();
    }

    @OPTIONS
    @Path("/login")
    public void optionsLogin() {
    }
}