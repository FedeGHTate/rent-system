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
        this.price = new BigDecimal(String.valueOf(price));
    }

    public Service(String id, String name, Float price) {
        this.id = id;
        this.name = name;
        this.price = new BigDecimal(String.valueOf(price));
    }

    public void patchService(Service serviceWithChanges) {

        if(!serviceWithChanges.getName().isEmpty()) {
            this.name = serviceWithChanges.getName();
        }

        if(serviceWithChanges.getPrice().floatValue() > 0) {
            this.price = serviceWithChanges.getPrice();
        }
    }
}
