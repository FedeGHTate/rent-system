package sharumaki.h.f.rent_system.bill_generator.model;

import lombok.Data;

@Data
public class BillRentInfo {
    private String id;
    private String rentName;

    public BillRentInfo(String id, String rentName) {
        this.id = id;
        this.rentName = rentName;
    }
}
