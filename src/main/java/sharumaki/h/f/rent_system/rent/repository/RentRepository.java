package sharumaki.h.f.rent_system.rent.repository;

import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.rent.model.Rent;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentRepository {
    public Optional<List<Rent>> getAll();
    public Optional<Rent> getById(String id);
    public Rent save(Rent rent);
    public Rent update(Rent rent);
    public void delete(int id);
}
