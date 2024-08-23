package sharumaki.h.f.rent_system.rent.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
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
    @Id
    private String id;
    private String name;
    private String description;
    private int maximumOccupancy;
    private int currentOccupancy;
    private BigDecimal price;
    private Tenant actualTenant;
    private int leaseTerm;
    private RentStatus status;
    private LocalDate beginninOfPeriod;
    private LocalDate endOfPeriod;

    public Rent(String name, String description, int maximumOccupancy, Float price) {
        this.name = name;
        this.description = description;
        this.maximumOccupancy = maximumOccupancy;
        this.currentOccupancy = 0;
        this.price = BigDecimal.valueOf(price);
        this.actualTenant = null;
        this.leaseTerm = 0;
        this.status = RentStatus.AVAILABLE;
    }

    public void assignTenant(Tenant tenant, int amountOfPeople) {

        if(this.getStatus() == RentStatus.OCCUPIED) {
            throw new RentHasATenantException();
        }

        if (this.getStatus() == RentStatus.UNAVAILABLE) {
            throw new RentIsUnavailableException();
        }

        this.actualTenant = tenant;
        this.currentOccupancy = amountOfPeople;
        this.status = RentStatus.OCCUPIED;
    }

    public void disable() {

        if(this.status == RentStatus.OCCUPIED) {
            this.endOfPeriod = LocalDate.now();
        }

        this.status = RentStatus.UNAVAILABLE;
    }

    public void clearTenant() {

        if(this.status == RentStatus.OCCUPIED) {
            this.setActualTenant(null);
            this.status = RentStatus.AVAILABLE;
        } else {
            throw new RentException("It's already closed");
        }
    }

    public void patchRent(Rent aRentToUpdate) {

        if(!aRentToUpdate.getName().isEmpty()) {
            this.name = aRentToUpdate.getName();
        }

        if(!aRentToUpdate.getDescription().isEmpty()) {
            this.description = aRentToUpdate.getDescription();
        }

        if(aRentToUpdate.getMaximumOccupancy() > 0) {
            this.maximumOccupancy = aRentToUpdate.getMaximumOccupancy();
        }

        if(aRentToUpdate.getPrice().floatValue() > 0) {
            this.price = aRentToUpdate.getPrice();
        }
    }
}
