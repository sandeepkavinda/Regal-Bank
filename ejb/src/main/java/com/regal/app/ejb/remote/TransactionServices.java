package com.regal.app.ejb.remote;

import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.dto.TransactionDTO;
import com.regal.app.core.entity.Transaction;
import jakarta.ejb.Local;
import jakarta.ejb.Remote;

import java.util.List;

@Remote
public interface TransactionServices {
    Boolean addTransaction(String fromUserId, String toUserId, double amount, String note);
    List<Transaction> getUserTransactions(String accountNumber);
}
