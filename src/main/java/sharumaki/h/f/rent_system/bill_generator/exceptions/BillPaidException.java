package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class BillPaidException extends BillGeneratorException{

    public BillPaidException() {
        super("Bill was paid");
    }
}
