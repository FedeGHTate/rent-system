package sharumaki.h.f.rent_system.service.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document("services")
@Data
public class Service {
    String id;
    String name;
    BigDecimal price;

    public Service() {
    }

    public Service(String name, float price) {
        this.name = name;
        this.price = BigDecimal.valueOf(price);
    }
}
