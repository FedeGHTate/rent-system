package sharumaki.h.f.rent_system.rent.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.rent.exceptions.RentHasATenantException;
import sharumaki.h.f.rent_system.rent.exceptions.RentIsUnavailableException;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Document("rents")
public class Rent {
    private String id;
    private String name;
    private int maximumOccupancy;
    private int currentOccupancy;
    private BigDecimal price;
    private Tenant actualTenant;
    private int leaseTerm;
    private RentStatus status;

    public Rent(String name, int maximumOccupancy, Float price) {
        this.name = name;
        this.maximumOccupancy = maximumOccupancy;
        this.currentOccupancy = 0;
        this.price = BigDecimal.valueOf(price);
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

    public void patchRent(Rent aRentToUpdate) {

        if(aRentToUpdate.getName() != null) {
            this.name = aRentToUpdate.getName();
        }

        if(aRentToUpdate.getMaximumOccupancy() > 0) {
            this.maximumOccupancy = aRentToUpdate.getMaximumOccupancy();
        }

        if(aRentToUpdate.getPrice() != null ) {
            this.price = aRentToUpdate.getPrice();
        }

        if(aRentToUpdate.getActualTenant() != null) {
            this.actualTenant = aRentToUpdate.getActualTenant();
        }

        if(aRentToUpdate.getStatus() != this.status) {
            this.status = aRentToUpdate.getStatus();
        }
    }
}
