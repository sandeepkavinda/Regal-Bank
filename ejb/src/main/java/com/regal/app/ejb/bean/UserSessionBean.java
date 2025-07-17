package com.regal.app.ejb.bean;

import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.core.model.UserRegistrationResult;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class UserSessionBean implements UserService {

    @PersistenceContext
    private EntityManager em;

    @Override
    public User getUserByEmailAndPassword(User user) {
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return null;
    }

    @Override
    public User getUserById(Long id) {
        User user = em.find(User.class,id);
        return user;
    }

    @Override
    public ResponseDTO registerUser(User user) {
        ResponseDTO responseDTO = new ResponseDTO();
        try{
            List<User> checkedUser = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                    .setParameter("email", user.getEmail())
                    .getResultList();

            if(user.getFirstName().isEmpty()){
                responseDTO.setContent("First name is required");
            }else if(user.getLastName().isEmpty()){
                responseDTO.setContent("Last name is required");
            }else if(user.getEmail().isEmpty()){
                responseDTO.setContent("Email is required");
            } else if (!checkedUser.isEmpty()) {
                responseDTO.setContent("Email already exists");
            } else if(user.getPassword().isEmpty()){
                responseDTO.setContent("Password is required");
            }else if(user.getBalance()<0){
                responseDTO.setContent("Balance cannot be negative");
            }else{
                em.persist(user);
                responseDTO.setSuccess(true);
                responseDTO.setContent("User has been registered successfully");
            }

        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setContent("Internal Server Error");
        }

        return responseDTO;

    }
}
