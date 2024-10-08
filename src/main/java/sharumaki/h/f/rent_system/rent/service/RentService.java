package sharumaki.h.f.rent_system.rent.service;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.rent.exceptions.RentNotFoundException;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.repository.RentRepository;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.tenant.services.TenantService;

import java.util.List;

@Service
public class RentService {

    RentRepository rentRepository;
    TenantService tenantService;

    public RentService(RentRepository rentRepository, TenantService tenantService) {
        this.rentRepository = rentRepository;
        this.tenantService = tenantService;
    }

    public Rent getById(String id) {
        Rent aRent = rentRepository.getById(id).orElseThrow(RentNotFoundException::new);
        return aRent;
    }

    public Rent createRent(Rent rent) {
        return rentRepository.save(rent);
    }

    public Rent update(Rent aRentToUpdate) {
        Rent rent = this.getById(aRentToUpdate.getId());

        rent.patchRent(aRentToUpdate);

        return this.rentRepository.update(rent);
    }

    public void delete(String id) {
        rentRepository.delete(id);
    }

    public List<Rent> getAll() {
        List<Rent> rents = rentRepository.getAll().orElseThrow(RentNotFoundException::new);

        return rents;
    }

    public void clearRentTenant(String rentId) {
        Rent rent = this.getById(rentId);

        rent.clearTenant();

        rentRepository.update(rent);
    }

    public void disableTenantAllocation(String rentId) {
        Rent rent = this.getById(rentId);

        rent.disable();

    }

    public Rent assignTenant(String rentId, String tenantId, int amountOfPeople) {
        Rent rent = this.getById(rentId);
        Tenant tenant = this.tenantService.getById(tenantId);

        rent.assignTenant(tenant,amountOfPeople);

        return rentRepository.update(rent);
    }
}
