package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class BillRefundedException extends BillGeneratorException{
    public BillRefundedException() {
        super("Bill was refunded");
    }
}
