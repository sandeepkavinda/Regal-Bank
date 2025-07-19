package com.regal.app.ejb.remote;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import jakarta.ejb.Remote;

import java.util.List;

@Remote
public interface UserService {
    User getUserByEmailAndPassword(User user);
    User getUserByEmail(String email);
    User getUserByAccountNumber(String accountNumber);
    ResponseDTO registerUser(User user);
    Boolean validate(String email,String password);
    double checkAccountBalanceByAccountNumber(String accountNumber);
    List<User> getAllUsers();
}
