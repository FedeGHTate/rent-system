package sharumaki.h.f.rent_system.rent.repository.impl;

import org.springframework.data.mongodb.repository.MongoRepository;
import sharumaki.h.f.rent_system.rent.model.Rent;


public interface RentMongoRepository extends MongoRepository<Rent, String> {
}
