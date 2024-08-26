package sharumaki.h.f.rent_system.bill_generator.dto;

import lombok.Data;

@Data
public class BillCreateRequestDTO {
    String rentId;
    int days;
    boolean withRecharges;
}
