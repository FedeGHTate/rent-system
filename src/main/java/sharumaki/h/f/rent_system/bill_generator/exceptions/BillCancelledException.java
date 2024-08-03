package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class BillCancelledException extends BillGeneratorException{
    public BillCancelledException() {
        super("Bill was cancelled");
    }
}
