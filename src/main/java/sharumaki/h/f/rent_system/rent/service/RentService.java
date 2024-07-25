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
        Rent aRent = rentRepository.getById(id).orElseThrow(() -> new RentNotFoundException());
        return aRent;
    }
}
