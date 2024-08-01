package sharumaki.h.f.rent_system.rent.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import sharumaki.h.f.rent_system.rent.exceptions.RentException;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.rent.exceptions.RentHasATenantException;
import sharumaki.h.f.rent_system.rent.exceptions.RentIsUnavailableException;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private LocalDate beginninOfPeriod;
    private LocalDate endOfPeriod;

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

    public void disable() {

        if(this.status == RentStatus.OCCUPIED) {
            this.endOfPeriod = LocalDate.now();
        }

        this.status = RentStatus.UNAVAILABLE;
    }

    public void close() {

        if(this.status == RentStatus.AVAILABLE) {
            this.status = RentStatus.AVAILABLE;
        } else {
            throw new RentException("It's already closed");
        }
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
    }
}
