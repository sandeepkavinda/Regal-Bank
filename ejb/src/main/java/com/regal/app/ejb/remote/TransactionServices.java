package com.regal.app.ejb.remote;

import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.dto.TransactionDTO;
import jakarta.ejb.Local;
import jakarta.ejb.Remote;

@Remote
public interface TransactionServices {
    Boolean addTransaction(String fromUserId, String toUserId, double amount, String note);
}
