package com.regal.app.ejb.remote;

import com.regal.app.core.entity.Interest;
import jakarta.ejb.Remote;

import java.util.List;

@Remote
public interface InterestService {
    void calculateInterest();
    List<Interest> getUserInterestHistory(String accountNumber);
}
