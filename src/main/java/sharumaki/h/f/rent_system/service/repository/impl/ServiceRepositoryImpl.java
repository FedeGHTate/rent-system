package sharumaki.h.f.rent_system.service.repository.impl;

import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.service.model.Service;
import sharumaki.h.f.rent_system.service.repository.ServiceRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class ServiceRepositoryImpl implements ServiceRepository {

    ServiceMongoRepository serviceMongoRepository;

    public ServiceRepositoryImpl(ServiceMongoRepository serviceMongoRepository) {
        this.serviceMongoRepository = serviceMongoRepository;
    }

    @Override
    public Optional<List<Service>> getAll() {
        return Optional.of(this.serviceMongoRepository.findAll());
    }

    @Override
    public Optional<Service> getById(String id) {
        return this.serviceMongoRepository.findById(id);
    }

    @Override
    public Service save(Service service) {
        return this.serviceMongoRepository.insert(service);
    }

    @Override
    public Service update(Service service) {
        return this.serviceMongoRepository.save(service);
    }

    @Override
    public void delete(String id) {
        this.serviceMongoRepository.deleteById(id);
    }
}
