package com.regal.app.web.servlet;

import com.google.gson.Gson;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/user/LoadUserDashboard")
public class LoadUserDashboard extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = (User) request.getSession().getAttribute("user");

        ResponseDTO responseDTO = new ResponseDTO();

        if(user!=null){
            responseDTO.setSuccess(true);
            responseDTO.setContent("Success");
        }else{
            responseDTO.setContent("User not found");
        }

        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseDTO));

    }
}
