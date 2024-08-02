package sharumaki.h.f.rent_system.tenant.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tenants")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Tenant {
    @Id
    String id;
    String firstname;
    String lastname;
    String dni;
    String contactNumber;

    public void patchTenant(Tenant tenantToUpdate) {

        if(!tenantToUpdate.getFirstname().isEmpty()) {
            this.firstname = tenantToUpdate.getFirstname();
        }

        if(!tenantToUpdate.getLastname().isEmpty()) {
            this.lastname = tenantToUpdate.getLastname();
        }

        if(!tenantToUpdate.getDni().isEmpty()) {
            this.dni = tenantToUpdate.getDni();
        }

        if(!tenantToUpdate.getContactNumber().isEmpty()) {
            this.contactNumber = tenantToUpdate.getContactNumber();
        }

    }
}
