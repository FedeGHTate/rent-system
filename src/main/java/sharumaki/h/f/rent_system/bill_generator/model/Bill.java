package sharumaki.h.f.rent_system.bill_generator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillCancelledException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillRefundedException;
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

        if(this.status == BillStatus.CANCELLED) {
            throw new BillCancelledException();
        }

        if (this.status == BillStatus.REFUNDED) {
            throw  new BillRefundedException();
        }

        this.paidDate = LocalDate.now();
        this.status = BillStatus.PAID;
    }

    public void refund() {
        this.status = BillStatus.REFUNDED;
    }

}
