package sharumaki.h.f.rent_system.rent.exceptions;

public class RentNotFoundException extends RentException{
    public RentNotFoundException() {
        super("Rent not found");
    }
}
