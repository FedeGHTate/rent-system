package sharumaki.h.f.rent_system.tenant.repository;

import sharumaki.h.f.rent_system.tenant.model.Tenant;

import java.util.List;
import java.util.Optional;

public interface TenantRepository {
    public Optional<List<Tenant>> getAll();
    public Optional<Tenant> getById(String id);
    public Tenant save(Tenant rent);
    public Tenant update(Tenant rent);
    public void delete(String id);
}
