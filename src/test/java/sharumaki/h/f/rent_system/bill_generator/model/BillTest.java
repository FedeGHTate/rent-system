package sharumaki.h.f.rent_system.bill_generator.model;

import org.junit.jupiter.api.Test;
import sharumaki.h.f.rent_system.rent.model.Rent;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class BillTest {

    @Test
    void createABillWithAPriceOf20WithARentOf10AndAServiceOf10() {

        Rent aRent = new Rent("A","aa",1,10f);

        Bill bill = Bill.builder().rent(aRent).dueDate(LocalDate.now().plusDays(2)).serviceCharge(BigDecimal.valueOf(10f)).build();

        assertEquals(20f,bill.getAmount().floatValue());
    }
}