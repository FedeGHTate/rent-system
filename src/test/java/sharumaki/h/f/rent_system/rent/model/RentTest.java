package sharumaki.h.f.rent_system.rent.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import sharumaki.h.f.rent_system.Tenant.model.Tenant;
import sharumaki.h.f.rent_system.rent.exceptions.RentHasATenantException;
import sharumaki.h.f.rent_system.rent.exceptions.RentIsUnavailableException;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class RentTest {

    Rent aRent;
    Tenant aTenantMock;
    @BeforeEach
    void init() {
        aRent = new Rent("Rent 1",2, BigDecimal.valueOf(199));
        aTenantMock = mock(Tenant.class);
    }

    @Test
    public void assignATenantToAOccupiedRentThrowsException() {
        assertThrows(RentHasATenantException.class,() -> aRent.assignTenant(aTenantMock));
    }

    @Test
    public void assignATenantToARentSuccessfully() {
        aRent.assignTenant(aTenantMock);

        assertEquals(RentStatus.OCCUPIED,aRent.getStatus());
    }

    @Test
    public void thePriceForTheRentIs3000WithoutExpenses() {
        aRent.assignTenant(aTenantMock);
        aRent.setPrice(BigDecimal.valueOf(3000));

        assertEquals(3000,aRent.getPrice());

    }

    @Test
    public void anUnavailableRentCanBeAssignedToATenant() {
        aRent.deactivate();

        assertThrows(RentIsUnavailableException.class, () -> aRent.assignTenant(aTenantMock));
    }
}