package sharumaki.h.f.rent_system.rent.service;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.rent.exceptions.RentNotFoundException;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.repository.RentRepository;

import java.util.Optional;

@Service
public class RentService {

    RentRepository rentRepository;

    public RentService(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    public Rent getById(String id) {
        Rent aRent = rentRepository.getById(id).orElseThrow(RentNotFoundException::new);
        return aRent;
    }

    public Rent createRent(Rent rent) {
        return rentRepository.save(rent);
    }

    public Rent update(Rent aRentToUpdate) {
        Optional<Rent> optRent = rentRepository.getById(aRentToUpdate.getId());

        Rent rent = optRent.orElseThrow(RentNotFoundException::new);

        rent.patchRent(aRentToUpdate);

        return this.rentRepository.save(rent);
    }

    public void delete(String id) {
        rentRepository.delete(id);
    }
}
