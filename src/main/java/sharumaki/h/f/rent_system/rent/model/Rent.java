package sharumaki.h.f.rent_system.rent.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sharumaki.h.f.rent_system.Tenant.model.Tenant;
import sharumaki.h.f.rent_system.rent.exceptions.RentHasATenantException;
import sharumaki.h.f.rent_system.rent.exceptions.RentIsUnavailableException;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class Rent {
    private String id;
    private String name;
    private int maximumOccupancy;
    private int currentOccupancy;
    private BigDecimal price;
    private Tenant actualTenant;
    private int leaseTerm;
    private RentStatus status;

    public Rent(String name, int maximumOccupancy, BigDecimal price) {
        this.name = name;
        this.maximumOccupancy = maximumOccupancy;
        this.currentOccupancy = 0;
        this.price = price;
        this.actualTenant = null;
        this.leaseTerm = 0;
        this.status = RentStatus.AVAILABLE;
    }

    public void assignTenant(Tenant tenant) {

        if(this.getStatus() == RentStatus.OCCUPIED) {
            throw new RentHasATenantException();
        }

        if (this.getStatus() == RentStatus.UNAVAILABLE) {
            throw new RentIsUnavailableException();
        }

        this.actualTenant = tenant;
        this.status = RentStatus.OCCUPIED;
    }

    public void deactivate() {
        this.status = RentStatus.UNAVAILABLE;
        this.actualTenant = null;
    }
}
