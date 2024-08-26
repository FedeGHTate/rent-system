package sharumaki.h.f.rent_system.bill_generator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import sharumaki.h.f.rent_system.bill_generator.exceptions.*;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.tenant.model.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Document("bills")
public class Bill {
    @Id
    private String id;
    private BigDecimal amount;
    private BigDecimal basePrice;
    private BigDecimal serviceCharge;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Tenant tenant;
    private BillRentInfo billRentInfo;
    private LocalDate paidDate;
    private BillStatus status;

    private Bill(Rent rent,BigDecimal basePrice, BigDecimal serviceCharge, LocalDate dueDate) {

        this.amount = basePrice.add(serviceCharge);
        this.basePrice = basePrice;
        this.serviceCharge = serviceCharge;
        this.billRentInfo = new BillRentInfo(rent.getId(),rent.getName());
        this.issueDate = LocalDate.now();
        this.dueDate = dueDate;
        this.tenant = rent.getActualTenant();
        this.paidDate = null;
        this.status = BillStatus.UNPAID;
    }

    public static BillBuilder builder() {
        return new BillBuilder();
    }

    public static class BillBuilder {

        private Rent rent;
        private BigDecimal basePrice;
        private BigDecimal serviceCharge = BigDecimal.ZERO;
        private LocalDate dueDate;

        public BillBuilder dueDate(LocalDate dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public BillBuilder rent(Rent rent) {
            this.rent = rent;
            this.basePrice = rent.getPrice();
            return this;
        }

        public BillBuilder serviceCharge(BigDecimal serviceCharge) {
            this.serviceCharge = serviceCharge;
            return this;
        }
        public Bill build() {

            if(this.rent == null) {
                throw new IllegalArgumentException("Rent must be provided");
            }

            if(this.dueDate == null) {
                throw new IllegalArgumentException("Due date must be provided");
            }

            return new Bill(this.rent,this.basePrice, this.serviceCharge,dueDate);
        }
    }

    public void cancel() {
        verifyStatus();
        this.status = BillStatus.CANCELLED;
    }

    public void pay() {

        verifyStatus();

        this.paidDate = LocalDate.now();
        this.status = BillStatus.PAID;
    }

    private void verifyStatus() {
        if(this.status == BillStatus.CANCELLED) {
            throw new BillCancelledException();
        }

        if (this.status == BillStatus.REFUNDED) {
            throw  new BillRefundedException();
        }

        if(this.status == BillStatus.PAID) {
            throw new BillPaidException();
        }
    }

    public void refund() {

        if(this.status == BillStatus.CANCELLED) {
            throw new BillCancelledException();
        }

        if (this.status == BillStatus.REFUNDED) {
            throw  new BillRefundedException();
        }

        if (this.status == BillStatus.UNPAID) {
            throw  new BillRefundUnpaidException();
        }
        this.status = BillStatus.REFUNDED;
    }
}
