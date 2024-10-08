package sharumaki.h.f.rent_system.tenant.services;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.rent.exceptions.RentNotFoundException;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.tenant.exceptions.TenantNotFoundException;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.tenant.repository.TenantRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TenantService {

    TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    public Tenant getById(String id) {
        Tenant tenant = tenantRepository.getById(id).orElseThrow(TenantNotFoundException::new);
        return tenant;
    }

    public List<Tenant> getAll() {
        List<Tenant> tenants = tenantRepository.getAll().orElseThrow(TenantNotFoundException::new);
        return tenants;
    }

    public void delete(String id) {
        tenantRepository.delete(id);
    }

    public Tenant update(Tenant tenantToUpdate) {
        Tenant tenant = this.getById(tenantToUpdate.getId());

        tenant.patchTenant(tenantToUpdate);

        return this.tenantRepository.update(tenant);
    }

    public Tenant createTenant(Tenant tenant) {
        return this.tenantRepository.save(tenant);
    }
}
