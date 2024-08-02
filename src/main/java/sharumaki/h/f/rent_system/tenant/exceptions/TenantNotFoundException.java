package sharumaki.h.f.rent_system.tenant.exceptions;

public class TenantNotFoundException extends TenantException{
    public TenantNotFoundException() {
        super("Tenant not found");
    }
}
