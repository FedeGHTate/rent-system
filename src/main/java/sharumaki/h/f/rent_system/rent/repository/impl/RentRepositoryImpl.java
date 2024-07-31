package sharumaki.h.f.rent_system.rent.repository.impl;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.repository.RentRepository;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@Repository
public class RentRepositoryImpl implements RentRepository {

    private RentMongoRepository mongoRepository;

    public RentRepositoryImpl(RentMongoRepository mongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    @Override
    public Optional<List<Rent>> getAll() {
        List<Rent> rents = mongoRepository.findAll();
        return Optional.of(rents);
    }

    @Override
    public Optional<Rent> getById(String id) {
        return mongoRepository.findById(id);
    }

    @Override
    public Rent save(Rent rent) {
        return mongoRepository.insert(rent);
    }

    @Override
    public Rent update(Rent rent) {
        return mongoRepository.save(rent);
    }

    @Override
    public void delete(String id) {
        mongoRepository.deleteById(id);
    }
}
