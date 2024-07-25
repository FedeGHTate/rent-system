package sharumaki.h.f.rent_system.rent.repository.impl;

import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.repository.RentRepository;

import java.util.List;
import java.util.Optional;

public class RentMongoRepository implements RentRepository {

    @Override
    public Optional<List<Rent>> getAll() {
        return Optional.empty();
    }

    @Override
    public Optional<Rent> getById(String id) {
        return Optional.empty();
    }

    @Override
    public Rent save(Rent rent) {
        return null;
    }

    @Override
    public Rent update(Rent rent) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
