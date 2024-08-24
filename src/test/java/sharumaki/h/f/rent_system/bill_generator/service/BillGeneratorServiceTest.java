package sharumaki.h.f.rent_system.bill_generator.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillCancelledException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillRefundedException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.InvalidBillPeriodException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.MissingTenantException;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.repository.BillRepository;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.service.RentService;
import sharumaki.h.f.rent_system.tenant.model.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

class BillGeneratorServiceTest {
    Tenant tenantMock;
    BillGeneratorService billGeneratorService;

    BillRepository billRepositoryMock;
    RentService rentServiceMock;
    @BeforeEach
    public void init() {
        tenantMock = mock(Tenant.class);
        rentServiceMock = mock(RentService.class);
        billRepositoryMock = mock(BillRepository.class);
        billGeneratorService = new BillGeneratorService(rentServiceMock,billRepositoryMock);

    }

    @Test
    public void minimumPeriodOfMonthMustBeMoreThanZero() {
        Rent aRent = new Rent("example","A Description",1,1f);
        aRent.setActualTenant(mock(Tenant.class));

        doReturn(mock(Bill.class)).when(billRepositoryMock).save(Mockito.any(Bill.class));
        doReturn(aRent).when(rentServiceMock).getById(Mockito.anyString());

        assertThrows(InvalidBillPeriodException.class, () -> billGeneratorService.createBill("1",0));
        assertDoesNotThrow(() -> billGeneratorService.createBill("1",1));
    }

    @Test
    public void throwsExceptionBecauseARentMustHaveATenantToCreateABill() {
        Rent aRent = new Rent("example","A Description",1,1f);

        doReturn(mock(Bill.class)).when(billRepositoryMock).save(Mockito.any(Bill.class));
        doReturn(aRent).when(rentServiceMock).getById(Mockito.anyString());

        assertThrows(MissingTenantException.class, () -> billGeneratorService.createBill("1",99));
    }

    @Test
    public void cannotBePaidABillCancelledOrRefunded() {

        Rent aRent = new Rent("example","A Description",1,1f);
        aRent.setActualTenant(mock(Tenant.class));
        Bill aBill = new Bill(aRent, LocalDate.now());
        aBill.setId("1");

        doReturn(Optional.of(aBill)).when(billRepositoryMock).getById("1");

        assertThrows(BillCancelledException.class, () -> {
            aBill.cancel();
            billGeneratorService.pay(aBill.getId());
        });
    }

    @Test
    public void cannotBePaidABillRefunded() {

        Rent aRent = new Rent("example","A Description",1,1f);
        aRent.setActualTenant(mock(Tenant.class));
        Bill aBill = new Bill(aRent, LocalDate.now());
        aBill.setId("1");

        doReturn(Optional.of(aBill)).when(billRepositoryMock).getById("1");

        aBill.pay();

        assertThrows(BillRefundedException.class, () -> {
            aBill.refund();
            billGeneratorService.pay(aBill.getId());
        });
    }
}