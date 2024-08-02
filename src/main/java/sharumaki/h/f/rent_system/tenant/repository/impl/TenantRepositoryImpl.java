package sharumaki.h.f.rent_system.tenant.repository.impl;

import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.tenant.repository.TenantRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class TenantRepositoryImpl implements TenantRepository {

    TenantMongoRepository mongoRepository;

    public TenantRepositoryImpl(TenantMongoRepository tenantMongoRepository) {
        this.mongoRepository = tenantMongoRepository;
    }

    @Override
    public Optional<List<Tenant>> getAll() {
        List<Tenant> tenants = mongoRepository.findAll();
        return Optional.of(tenants);
    }

    @Override
    public Optional<Tenant> getById(String id) {
        return mongoRepository.findById(id);
    }

    @Override
    public Tenant save(Tenant tenant) {
        return mongoRepository.insert(tenant);
    }

    @Override
    public Tenant update(Tenant tenant) {
        return mongoRepository.save(tenant);
    }

    @Override
    public void delete(String id) {
        mongoRepository.deleteById(id);
    }
}
