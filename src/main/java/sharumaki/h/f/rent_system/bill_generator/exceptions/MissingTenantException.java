package sharumaki.h.f.rent_system.bill_generator.exceptions;

public class MissingTenantException extends BillGeneratorException{
    public MissingTenantException() {
        super("Rent must to have a Tenant");
    }
}
