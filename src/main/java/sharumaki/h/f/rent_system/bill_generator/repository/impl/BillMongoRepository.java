package sharumaki.h.f.rent_system.bill_generator.repository.impl;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;

@Repository
public interface BillMongoRepository extends MongoRepository<Bill,String> {
}
