package com.regal.app.ejb.remote;

import jakarta.ejb.Remote;

@Remote
public interface InterestService {
    void calculateInterest();
}
