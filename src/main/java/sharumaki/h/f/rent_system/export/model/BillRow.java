package sharumaki.h.f.rent_system.export.model;

import lombok.Getter;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class BillRow {
    private String id;
    private String rentName;

    private String amount;
    private String basePrice;
    private String serviceCharge;
    private String issueDate;
    private String dueDate;
    private String tenantFirstname;
    private String tenantLastname;
    private String dni;
    private String contactNumber;
    private String paidDate;
    private String status;

    public BillRow(Bill bill) {

        this.id = bill.getId();
        this.rentName = bill.getBillRentInfo().getRentName();

        if(bill.getBasePrice() == null) {
            this.basePrice = "0.0";
        } else {
            this.basePrice = bill.getBasePrice().toPlainString();
        }

        if(bill.getServiceCharge() == null) {
            this.serviceCharge = "0.0";
        } else {
            this.serviceCharge = bill.getBasePrice().toPlainString();
        }

        if(bill.getPaidDate() == null) {
            this.paidDate = "";
        } else {
            this.paidDate = bill.getPaidDate().toString();
        }

        this.amount = bill.getAmount().toPlainString();
        this.issueDate = bill.getIssueDate().toString();
        this.dueDate = bill.getDueDate().toString();
        this.tenantFirstname = bill.getTenant().getFirstname();
        this.tenantLastname = bill.getTenant().getLastname();
        this.dni = bill.getTenant().getDni();
        this.contactNumber = bill.getTenant().getContactNumber();
        this.status = bill.getStatus().name();
    }
}
