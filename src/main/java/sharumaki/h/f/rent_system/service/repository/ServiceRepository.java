package sharumaki.h.f.rent_system.service.repository;

import sharumaki.h.f.rent_system.service.model.Service;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository {
    public Optional<List<Service>> getAll();
    public Optional<Service> getById(String id);
    public Service save(Service service);
    public Service update(Service service);
    public void delete(String id);
}
