package com.regal.app.web.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.inject.Inject;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.SecurityContext;
import jakarta.security.enterprise.authentication.mechanism.http.AuthenticationParameters;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/Login")
public class Login extends HttpServlet {

    @EJB
    private UserService userService;

    @Inject
    private SecurityContext securityContext;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        User user = gson.fromJson(request.getReader(), User.class);

        ResponseDTO responseDTO = new ResponseDTO();

        System.out.println(user.getEmail());
        System.out.println(user.getPassword());

        if(user.getEmail().isEmpty()){
            responseDTO.setContent("Enter the Email");
        }else if(user.getPassword().isEmpty()){
            responseDTO.setContent("Enter the Password");
        }else{

            AuthenticationParameters parameters = AuthenticationParameters.withParams().credential(new UsernamePasswordCredential(user.getEmail(), user.getPassword()));

            AuthenticationStatus status = securityContext.authenticate(request, response, parameters);

            System.out.println("Status : "+ status);

            if(status == AuthenticationStatus.SUCCESS){

                User loggedUser = userService.getUserByEmail(user.getEmail());

                responseDTO.setSuccess(true);
                responseDTO.setContent(loggedUser.getUserType().toString());
            }else{
                responseDTO.setContent("Invalid Login Credentials");
            }

        }

        System.out.println(gson.toJson(responseDTO));

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseDTO));

    }
}
