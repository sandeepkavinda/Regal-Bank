package com.regal.app.ejb.bean;

import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.entity.User;
import com.regal.app.core.entity.UserStatus;
import com.regal.app.core.entity.UserType;
import com.regal.app.core.model.AccountNumberGenerator;
import com.regal.app.core.model.UserRegistrationResult;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

import java.util.Collections;
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
        User user = em.createNamedQuery("User.findByEmail", User.class)
                .setParameter("email", email)
                .getSingleResult();
        return user;
    }

    @Override
    public User getUserByAccountNumber(String AccountNumber) {
        User user = em.find(User.class,AccountNumber);
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
                String accountNumber = AccountNumberGenerator.generateAccountNumber();
                user.setAccountNumber(accountNumber);
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

    @Override
    public Boolean validate(String email, String password) {

        List<User> users = em.createNamedQuery("User.findByEmailAndPassword", User.class)
                .setParameter("email", email)
                .setParameter("password", password)
                .getResultList();


        return !users.isEmpty();
    }

    @Override
    public double checkAccountBalanceByAccountNumber(String accountNumber) {
        try {
            User user = em.createQuery(
                            "SELECT u FROM User u WHERE u.accountNumber = :accNo", User.class)
                    .setParameter("accNo", accountNumber)
                    .getSingleResult();

            return user.getBalance(); // Account balance

        } catch (NoResultException e) {
            // Account not found
            return -1;
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            return em.createQuery("SELECT u FROM User u WHERE u.userStatus = :status AND u.userType = :type", User.class)
                    .setParameter("status", UserStatus.ACTIVE)
                    .setParameter("type", UserType.USER)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList(); // Return empty list if error occurs
        }
    }

    @Override
    public double getTotalReceivedAmount(String userAccountNumber) {
        try {
            Double total = em.createQuery(
                            "SELECT SUM(t.amount) FROM Transaction t WHERE t.toUser.accountNumber = :accountNumber", Double.class)
                    .setParameter("accountNumber", userAccountNumber)
                    .getSingleResult();

            return total != null ? total : 0.0;

        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }

    @Override
    public double getTotalSendAmount(String userAccountNumber) {
        try {
            Double total = em.createQuery(
                            "SELECT SUM(t.amount) FROM Transaction t WHERE t.fromUser.accountNumber = :accountNumber", Double.class)
                    .setParameter("accountNumber", userAccountNumber)
                    .getSingleResult();

            return total != null ? total : 0.0;

        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }

    @Override
    public double getTotalInterestByUser(String userAccountNumber) {
        try {
            Double total = em.createQuery(
                            "SELECT SUM(i.amount) FROM Interest i WHERE i.user.accountNumber = :userAccountNumber", Double.class)
                    .setParameter("userAccountNumber", userAccountNumber)
                    .getSingleResult();

            return total != null ? total : 0.0;

        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }

}
