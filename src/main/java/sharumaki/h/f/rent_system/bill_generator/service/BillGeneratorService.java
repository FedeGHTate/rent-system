package sharumaki.h.f.rent_system.bill_generator.service;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillNotFoundException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.InvalidBillPeriodException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.MissingTenantException;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.repository.BillRepository;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.service.RentService;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillGeneratorService {

    RentService rentService;

    BillRepository billRepository;

    public BillGeneratorService(RentService rentService, BillRepository billRepository) {
        this.rentService = rentService;
        this.billRepository = billRepository;
    }

    public List<Bill> getAll() {
        return billRepository.getAll().orElseThrow(BillNotFoundException::new);
    }

    public Bill getById(String id) {
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);
        return bill;
    }

    public Bill createBill(String rentId, int days) {

        if (days <= 0) {
            throw new InvalidBillPeriodException();
        }

        Rent rent = rentService.getById(rentId);

        if(rent.getActualTenant() == null) {
            throw new MissingTenantException();
        }

        Bill bill = new Bill(rent.getPrice(), LocalDate.now().plusDays(days),rent.getActualTenant());

        return billRepository.save(bill);
    }

    public Bill pay(String id) {
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);

        bill.pay();

        return billRepository.update(bill);
    }

    public Bill cancel(String id){
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);

        bill.cancel();

        return billRepository.update(bill);
    }

    public Bill refund(String id){
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);

        bill.refund();

        return billRepository.update(bill);
    }

    public Bill update(String id) {
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);

        // TODO
    }
}
