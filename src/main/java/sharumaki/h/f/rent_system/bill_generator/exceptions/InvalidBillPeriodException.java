package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class InvalidBillPeriodException extends BillGeneratorException{
    public InvalidBillPeriodException() {
        super("Invalid bill period. Minimum period is 1 month");
    }
}
