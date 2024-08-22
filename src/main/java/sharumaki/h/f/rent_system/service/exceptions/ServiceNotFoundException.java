package sharumaki.h.f.rent_system.service.exceptions;

public class ServiceNotFoundException extends ServiceException {
    public ServiceNotFoundException() {
        super("Service not found");
    }
}
