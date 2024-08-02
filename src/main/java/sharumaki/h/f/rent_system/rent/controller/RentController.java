package sharumaki.h.f.rent_system.rent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;
import sharumaki.h.f.rent_system.rent.dto.RentCreateRequestDTO;
import sharumaki.h.f.rent_system.rent.dto.RentDTO;
import sharumaki.h.f.rent_system.rent.dto.RentUpdateRequestDTO;
import sharumaki.h.f.rent_system.rent.mapper.RentMapper;
import sharumaki.h.f.rent_system.rent.model.Rent;
import sharumaki.h.f.rent_system.rent.service.RentService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/rents")
public class RentController {

    RentService rentService;
    RentMapper rentMapper;

    public RentController(RentService rentService, RentMapper rentMapper) {
        this.rentService = rentService;
        this.rentMapper = rentMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity getARentById(@PathVariable String id) {

        Rent aRent = this.rentService.getById(id);
        RentDTO responseDTO = this.rentMapper.mapToRentDTO(aRent);

        ApiResponse<Object> apiResponse = ApiResponse.builder().value(responseDTO).build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping()
    public ResponseEntity getRents() {
        List<Rent> rents = this.rentService.getAll();

        List<RentDTO> responseDTO = rents.stream().map(rent -> rentMapper.mapToRentDTO(rent)).toList();

        ApiResponse<Object> apiResponse = ApiResponse.builder().value(responseDTO).build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity createRent(@RequestBody RentCreateRequestDTO rent) {
        Rent createdRent = this.rentService.createRent(new Rent(rent.getName(),rent.getMaximumOccupancy(),rent.getPrice()));
        RentDTO responseDTO = this.rentMapper.mapToRentDTO(createdRent);

        ApiResponse<Object> apiResponse = ApiResponse.builder().value(responseDTO).build();

        return ResponseEntity.created(URI.create("/" + responseDTO.getId())).body(apiResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateRent(@PathVariable String id, @RequestBody RentUpdateRequestDTO rent) {


        Rent aRentToUpdate = new Rent(rent.getName(),rent.getMaximumOccupancy(),rent.getPrice());
        aRentToUpdate.setId(id);

        Rent rentUpdated = this.rentService.update(aRentToUpdate);

        RentDTO responseDTO = this.rentMapper.mapToRentDTO(rentUpdated);
        ApiResponse<Object> apiResponse = ApiResponse.builder().value(responseDTO).build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRent(@PathVariable String id) {
        this.rentService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
