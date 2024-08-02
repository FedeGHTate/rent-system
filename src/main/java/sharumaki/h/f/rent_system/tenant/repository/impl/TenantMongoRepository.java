package sharumaki.h.f.rent_system.tenant.repository.impl;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.tenant.model.Tenant;

@Repository
public interface TenantMongoRepository extends MongoRepository<Tenant,String> {
}
