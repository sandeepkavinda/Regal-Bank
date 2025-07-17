package com.regal.app.web.servlet;

import com.google.gson.Gson;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.core.entity.UserStatus;
import com.regal.app.core.entity.UserType;
import com.regal.app.core.model.UserRegistrationResult;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/RegisterUser")
public class RegisterUser extends HttpServlet {

    @EJB
    private UserService userService;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        User user = gson.fromJson(request.getReader(), User.class);
        user.setUserType(UserType.USER);
        user.setUserStatus(UserStatus.ACTIVE);
        ResponseDTO responseDTO = userService.registerUser(user);

        System.out.println(gson.toJson(responseDTO));

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseDTO));

    }
}
