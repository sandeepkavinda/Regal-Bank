package com.regal.app.web.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.Interest;
import com.regal.app.core.entity.Transaction;
import com.regal.app.core.entity.User;
import com.regal.app.ejb.remote.InterestService;
import com.regal.app.ejb.remote.TransactionServices;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/user/LoadUserDashboard")
public class LoadUserDashboard extends HttpServlet {

    @EJB
    private UserService userService;

    @EJB
    private TransactionServices transactionServices;

    @EJB
    private InterestService interestService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = (User) request.getSession().getAttribute("user");
        user.setPassword(null);

        if(user != null){
            Gson gson = new Gson();
            JsonObject jsonObject = new JsonObject();
            jsonObject.add("userData",gson.toJsonTree(user));

            double totalSend = userService.getTotalSendAmount(user.getAccountNumber());
            jsonObject.addProperty("totalSend",totalSend);

            double totalReceived = userService.getTotalReceivedAmount(user.getAccountNumber());
            jsonObject.addProperty("totalReceived",totalReceived);

            double totalInterest = userService.getTotalInterestByUser(user.getAccountNumber());
            jsonObject.addProperty("totalInterest",totalInterest);

            List<Transaction> transactionHistory = transactionServices.getUserTransactions(user.getAccountNumber());
            jsonObject.add("transactionHistoryData",gson.toJsonTree(transactionHistory));

            List<Interest> interestHistory = interestService.getUserInterestHistory(user.getAccountNumber());
            jsonObject.add("interestHistoryData",gson.toJsonTree(interestHistory));

            jsonObject.addProperty("success", true);

            System.out.println(gson.toJson(jsonObject));
            response.setContentType("application/json");
            response.getWriter().write(gson.toJson(jsonObject));
        }

    }
}
