package sharumaki.h.f.rent_system.rent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sharumaki.h.f.rent_system.rent.model.RentStatus;
import sharumaki.h.f.rent_system.tenant.model.Tenant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RentCreateRequestDTO {
    private String name;
    private int maximumOccupancy;
    private float price;
}
