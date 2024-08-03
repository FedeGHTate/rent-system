package sharumaki.h.f.rent_system.bill_generator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillCancelledException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillPaidException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillRefundedException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.InvalidBillPeriodException;
import sharumaki.h.f.rent_system.tenant.model.Tenant;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Document("biils")
public class Bill {
    @Id
    private String id;
    private BigDecimal amount;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Tenant tenant;
    private LocalDate paidDate;
    private BillStatus status;

    public Bill(BigDecimal amount, LocalDate dueDate, Tenant tenant) {
        this.amount = amount;
        this.issueDate = LocalDate.now();
        this.dueDate = dueDate;
        this.tenant = tenant;
        this.paidDate = null;
        this.status = BillStatus.UNPAID;
    }

    public void cancel() {
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
        this.status = BillStatus.REFUNDED;
    }

    public void patchBill(Bill billToUpdate) {

        verifyStatus();

        if(billToUpdate.getDueDate().isBefore(LocalDate.now())) {
            throw new InvalidBillPeriodException();
        }

        if(billToUpdate.getAmount().floatValue() > 0f) {
            this.amount = billToUpdate.getAmount();
        }

        if(billToUpdate.getDueDate() != null) {
            this.dueDate = billToUpdate.getDueDate();
        }
    }
}
