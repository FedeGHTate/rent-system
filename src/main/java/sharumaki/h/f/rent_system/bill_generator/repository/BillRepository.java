package sharumaki.h.f.rent_system.bill_generator.repository;


import sharumaki.h.f.rent_system.bill_generator.model.Bill;

import java.util.List;
import java.util.Optional;

public interface BillRepository {
    public Optional<List<Bill>> getAll();
    public Optional<Bill> getById(String id);
    public Bill save(Bill bill);
    public Bill update(Bill bill);
}
