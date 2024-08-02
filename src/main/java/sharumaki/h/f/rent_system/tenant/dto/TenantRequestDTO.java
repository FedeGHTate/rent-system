package sharumaki.h.f.rent_system.tenant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TenantRequestDTO {
    String firstname;
    String lastname;
    String dni;
    String contactNumber;
}
