package sharumaki.h.f.rent_system.rent.exceptions;

public class RentHasATenantException extends RentException{
    public RentHasATenantException() {
        super("Rent has a Tenant");
    }
}
