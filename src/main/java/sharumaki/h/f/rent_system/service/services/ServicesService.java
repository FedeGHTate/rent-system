package sharumaki.h.f.rent_system.service.services;

import sharumaki.h.f.rent_system.service.exceptions.ServiceException;
import sharumaki.h.f.rent_system.service.exceptions.ServiceNotFoundException;
import sharumaki.h.f.rent_system.service.model.Service;
import sharumaki.h.f.rent_system.service.repository.ServiceRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ServicesService {

    ServiceRepository serviceRepository;

    public ServicesService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> getAll() {
        return this.serviceRepository.getAll().orElseThrow(ServiceNotFoundException::new);
    }

    public Service getById(String id) {
        return this.serviceRepository.getById(id).orElseThrow(ServiceNotFoundException::new);
    }

    public void deleteById(String id) {
        this.serviceRepository.delete(id);
    }

    public Service create(Service service) {
        return this.serviceRepository.save(service);
    }

    public Service update(Service serviceWithChanges) {

        Service service = this.getById(serviceWithChanges.getId());
        service.patchService(serviceWithChanges);

        return this.serviceRepository.update(service);
    }
}
