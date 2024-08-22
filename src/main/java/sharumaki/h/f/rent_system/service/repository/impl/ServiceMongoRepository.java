package sharumaki.h.f.rent_system.service.repository.impl;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.service.model.Service;

@Repository
public interface ServiceMongoRepository extends MongoRepository<Service,String> {
}
