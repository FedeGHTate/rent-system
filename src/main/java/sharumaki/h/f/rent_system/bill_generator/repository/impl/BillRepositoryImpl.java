package sharumaki.h.f.rent_system.bill_generator.repository.impl;

import org.springframework.stereotype.Repository;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.repository.BillRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class BillRepositoryImpl implements BillRepository {

    BillMongoRepository billMongoRepository;

    public BillRepositoryImpl(BillMongoRepository billMongoRepository) {
        this.billMongoRepository = billMongoRepository;
    }

    @Override
    public Optional<List<Bill>> getAll() {
        List<Bill> bills = billMongoRepository.findAll();
        return Optional.of(bills);
    }

    @Override
    public Optional<Bill> getById(String id) {
        return billMongoRepository.findById(id);
    }

    @Override
    public Bill save(Bill bill) {
        return billMongoRepository.insert(bill);
    }

    @Override
    public Bill update(Bill bill) {
        return billMongoRepository.save(bill);
    }
}
