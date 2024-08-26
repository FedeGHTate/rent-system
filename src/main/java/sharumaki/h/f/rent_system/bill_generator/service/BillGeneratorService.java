package sharumaki.h.f.rent_system.bill_generator.service;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillNotFoundException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.InvalidBillPeriodException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.MissingTenantException;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.repository.BillRepository;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.service.RentService;
import sharumaki.h.f.rent_system.service.services.ServicesService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
public class BillGeneratorService {

    RentService rentService;

    BillRepository billRepository;

    ServicesService servicesService;

    public BillGeneratorService(RentService rentService, BillRepository billRepository, ServicesService servicesService) {
        this.rentService = rentService;
        this.billRepository = billRepository;
        this.servicesService = servicesService;
    }

    public List<Bill> getAll() {
        return billRepository.getAll().orElseThrow(BillNotFoundException::new);
    }

    public Bill getById(String id) {
        Bill bill = billRepository.getById(id).orElseThrow(BillNotFoundException::new);
        return bill;
    }


    public Bill createBill(String rentId, int days, boolean includeServices) {
        if (days <= 0) {
            throw new InvalidBillPeriodException();
        }

        Rent rent = rentService.getById(rentId);

        if(rent.getActualTenant() == null) {
            throw new MissingTenantException();
        }

        Bill.BillBuilder billBuilder = Bill.builder().rent(rent).dueDate(LocalDate.now().plusDays(days));

        if (includeServices) {
            BigDecimal quantityOfRents = BigDecimal.valueOf(rentService.getAll().size());

            BigDecimal servicesAmount = servicesService.getAll().stream().map(s -> s.getPrice()).reduce(BigDecimal.ZERO, BigDecimal::add);

            billBuilder
                    .serviceCharge(servicesAmount.divide(quantityOfRents,2, RoundingMode.HALF_UP))
                    .build();
        }

        Bill bill = billBuilder.build();

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

    public Bill update(Bill billToUpdate) {

        Bill bill = this.getById(billToUpdate.getId());

        bill.patchBill(billToUpdate);

        return this.billRepository.save(bill);
    }
}
