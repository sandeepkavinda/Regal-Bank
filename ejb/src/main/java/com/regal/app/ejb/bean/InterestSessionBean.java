package com.regal.app.ejb.bean;

import com.regal.app.core.entity.Interest;
import com.regal.app.core.entity.User;
import com.regal.app.ejb.remote.InterestService;
import com.regal.app.ejb.remote.UserService;
import jakarta.ejb.EJB;
import jakarta.ejb.Schedule;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class InterestSessionBean implements InterestService {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private UserService userService;

    @Override
    @Schedule(dayOfMonth = "1", hour = "0", minute = "0", second = "0")
    public void calculateInterest() {
        System.out.println("Calculating Interest");
        System.out.println(userService.getAllUsers().size());

        for (User user : userService.getAllUsers()) {
            double balance = user.getBalance();
            double interestRate = 0.01; // 1% monthly interest
            double interestAmount= new BigDecimal(balance * interestRate)
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue();

            if (interestAmount > 0) {
                Interest interest = new Interest();
                interest.setUser(user);
                interest.setAmount(interestAmount);
                interest.setDateTime(LocalDateTime.now());

                em.persist(interest);

                // Optionally update user's
                double newBalance= new BigDecimal(user.getBalance() + interestAmount)
                        .setScale(2, RoundingMode.HALF_UP)
                        .doubleValue();

                user.setBalance(newBalance);
                em.merge(user);

            }
        }

    }

    @Override
    public List<Interest> getUserInterestHistory(String accountNumber) {
        try {
            return em.createQuery(
                            "SELECT i FROM Interest i " +
                                    "WHERE i.user.accountNumber = :accountNumber " +
                                    "ORDER BY i.dateTime DESC", Interest.class)
                    .setParameter("accountNumber", accountNumber)
                    .getResultList();

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }


}
