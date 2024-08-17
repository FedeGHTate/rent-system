package sharumaki.h.f.rent_system.rent.mapper;

import org.springframework.stereotype.Component;
import sharumaki.h.f.rent_system.rent.dto.RentDTO;
import sharumaki.h.f.rent_system.rent.model.Rent;
@Component
public class RentMapper {

    public RentDTO mapToRentDTO(Rent rent) {

        RentDTO rentDTO = RentDTO.builder()
                .id(rent.getId())
                .name(rent.getName())
                .maximumOccupancy(rent.getMaximumOccupancy())
                .currentOccupancy(rent.getCurrentOccupancy())
                .price(rent.getPrice().floatValue())
                .description(rent.getDescription())
                .actualTenant(rent.getActualTenant())
                .leaseTerm(rent.getLeaseTerm())
                .status(rent.getStatus())
                .build();

        return rentDTO;
    }
}
