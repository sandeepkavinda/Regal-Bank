package com.regal.app.ejb.bean;

import com.regal.app.core.dto.ResponseDTO;
import com.regal.app.core.dto.TransactionDTO;
import com.regal.app.core.entity.Transaction;
import com.regal.app.core.entity.User;
import com.regal.app.ejb.remote.TransactionServices;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDateTime;

@Stateless
public class TransactionSessionBean implements TransactionServices {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private UserService userService;

    @Override
    public Boolean addTransaction(String fromUserId, String toUserId, double amount,String note) {
        try {

            User fromUser = em.find(User.class, fromUserId);
            User toUser = em.find(User.class, toUserId);

            if (fromUser == null || toUser == null) {
                return false; // Users not found
            }

            fromUser.setBalance(fromUser.getBalance() - amount);
            toUser.setBalance(toUser.getBalance() + amount);
            em.merge(fromUser);
            em.merge(toUser);

            Transaction transaction = new Transaction();
            transaction.setFromUser(fromUser);
            transaction.setToUser(toUser);
            transaction.setAmount(amount);
            transaction.setNote(note);
            transaction.setTransactionTime(LocalDateTime.now());
            em.persist(transaction);

            return true;


        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
