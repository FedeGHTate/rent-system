package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class BillNotFoundException extends BillGeneratorException{
    public BillNotFoundException() {
        super("Bill not found");
    }
}
