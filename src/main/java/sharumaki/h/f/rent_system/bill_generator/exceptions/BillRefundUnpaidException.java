package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class BillRefundUnpaidException extends BillGeneratorException{
    public BillRefundUnpaidException() {
        super("Can't refund a bill that is unpaid");
    }
}
