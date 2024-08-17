package sharumaki.h.f.rent_system.rent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.rent.model.RentStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RentDTO {
    private String id;
    private String name;
    private String description;
    private int maximumOccupancy;
    private int currentOccupancy;
    private float price;
    private Tenant actualTenant;
    private int leaseTerm;
    private RentStatus status;


}
