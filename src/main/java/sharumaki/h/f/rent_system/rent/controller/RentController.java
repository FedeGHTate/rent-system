package sharumaki.h.f.rent_system.rent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;
import sharumaki.h.f.rent_system.rent.dto.RentDTO;
import sharumaki.h.f.rent_system.rent.mapper.RentMapper;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.service.RentService;

@Controller
@RequestMapping("/api/v1/rent")
public class RentController {

    RentService rentService;
    RentMapper rentMapper;

    public RentController(RentService rentService, RentMapper rentMapper) {
        this.rentService = rentService;
        this.rentMapper = rentMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RentDTO>> getARentById(@RequestParam String id) {

        Rent aRent = this.rentService.getById(id);
        RentDTO responseDTO = this.rentMapper.mapToRentDTO(aRent);

        ApiResponse apiResponse = ApiResponse.builder().value(responseDTO).build();

        return ResponseEntity.ok(apiResponse);
    }
}
