package com.regal.app.ejb.remote;
import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.core.model.UserRegistrationResult;
import jakarta.ejb.Remote;

@Remote
public interface UserService {
    User getUserByEmailAndPassword(User user);
    User getUserByEmail(String email);
    User getUserById(Long id);
    ResponseDTO registerUser(User user);
    Boolean validate(String email,String password);

}
