package sharumaki.h.f.rent_system.rent.dto;

import lombok.Data;

@Data
public class AssignTenantRequestDTO {
    String tenantId;
    int occupancy;
}
