package sharumaki.h.f.rent_system.bill_generator.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BillUpdateRequestDTO {
    private BigDecimal amount;
    private LocalDate dueDate;
}
