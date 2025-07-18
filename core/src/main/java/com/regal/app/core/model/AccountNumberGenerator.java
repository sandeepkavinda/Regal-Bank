package com.regal.app.core.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

public class AccountNumberGenerator {

    private static final AtomicInteger counter = new AtomicInteger(100);

    public static String generateAccountNumber() {
        // Use current timestamp as base (yyMMddHHmmssSSS = 15 digits)
        String timestamp = new SimpleDateFormat("yyMMddHHmmssSSS").format(new Date());

        // Append a 3-digit counter to avoid duplicates
        int count = counter.getAndIncrement();
        if (count > 999) counter.set(100); // Reset counter if exceeds 3 digits

        return timestamp + String.format("%03d", count);
    }

}
