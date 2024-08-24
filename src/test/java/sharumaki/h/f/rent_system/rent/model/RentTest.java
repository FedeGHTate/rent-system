package sharumaki.h.f.rent_system.rent.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
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
        aRent = new Rent("Rent 1","A Description",2, 199f);
        aTenantMock = mock(Tenant.class);
    }

    @Test
    public void assignATenantToAOccupiedRentThrowsException() {
        aRent.assignTenant(aTenantMock,1);
        assertThrows(RentHasATenantException.class,() -> aRent.assignTenant(aTenantMock,1));
    }

    @Test
    public void assignATenantToARentSuccessfully() {
        aRent.assignTenant(aTenantMock,1);

        assertEquals(RentStatus.OCCUPIED,aRent.getStatus());
    }

    @Test
    public void thePriceForTheRentIs3000WithoutExpenses() {
        aRent.assignTenant(aTenantMock,1);
        aRent.setPrice(BigDecimal.valueOf(3000));

        assertEquals(BigDecimal.valueOf(3000),aRent.getPrice());

    }

    @Test
    public void anUnavailableRentCanBeAssignedToATenant() {
        aRent.disable();

        assertThrows(RentIsUnavailableException.class, () -> aRent.assignTenant(aTenantMock,1));
    }

    @Test
    public void rentUpdatedSuccessfully() {
        Rent rentToupdate = new Rent("Howdy","A Description",99,9999f);
        aRent.patchRent(rentToupdate);

        assertEquals("Howdy",aRent.getName());
        assertEquals(99,aRent.getMaximumOccupancy());
        assertEquals(9999f,aRent.getPrice().floatValue());
    }
}