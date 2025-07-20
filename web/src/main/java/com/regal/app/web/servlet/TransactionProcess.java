package com.regal.app.web.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.ejb.remote.TransactionServices;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/user/TransactionProcess")
public class TransactionProcess extends HttpServlet {


    @EJB
     private TransactionServices transactionServices;

    @EJB
    private UserService userService;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        User loggedUser = (User) request.getSession().getAttribute("user");
        ResponseDTO responseDTO = new ResponseDTO();

        if (loggedUser != null) {

            JsonElement jsonElement = gson.fromJson(request.getReader(), JsonElement.class);
            JsonObject jsonObject = jsonElement.getAsJsonObject();

            String toUserAccountNum = jsonObject.get("toUserAccountNum").getAsString();
            String note = jsonObject.get("note").getAsString();
            String fromUserAccountNum = loggedUser.getAccountNumber();


            if (toUserAccountNum.isEmpty()) {
                responseDTO.setContent("Invalid Beneficiary Account Number");
            } else if (toUserAccountNum.equals(fromUserAccountNum)) {
                responseDTO.setContent("Cannot transfer money to the same account");
            }else if (jsonObject.get("amount").getAsString().isEmpty()) {
                responseDTO.setContent("Invalid Amount");
            }else if (jsonObject.get("amount").getAsDouble() < 100) {
                responseDTO.setContent("The minimum amount that can be transferred is LKR 100");
            } else if (note.isEmpty()) {
                responseDTO.setContent("Invalid Comment");
            } else {
                User toUserObj = userService.getUserByAccountNumber(toUserAccountNum);
                if(toUserObj==null){
                    //Incorrect Beneficiary account number
                    responseDTO.setContent("Incorrect Beneficiary account number");
                }else {
                    double amount = jsonObject.get("amount").getAsDouble();
                    double accountBalance = userService.checkAccountBalanceByAccountNumber(fromUserAccountNum);

                    if(accountBalance-amount<0){
                        //Insufficient Balance
                        responseDTO.setContent("Insufficient Balance");
                    }else{
                        Boolean transactionSuccess = transactionServices.addTransaction(fromUserAccountNum, toUserAccountNum, amount, note);

                        if(transactionSuccess){
                            loggedUser.setBalance(loggedUser.getBalance()-amount);
                            request.getSession().setAttribute("user", loggedUser);
                            responseDTO.setSuccess(true);
                            responseDTO.setContent("Transaction Success");
                        }else {
                            responseDTO.setContent("Transaction Failed");
                        }
                    }
                }


            }

        } else {
            responseDTO.setContent("User Not Found");
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseDTO));


    }
}
