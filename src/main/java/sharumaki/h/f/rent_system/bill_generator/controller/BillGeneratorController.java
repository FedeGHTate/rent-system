package sharumaki.h.f.rent_system.bill_generator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharumaki.h.f.rent_system.bill_generator.dto.BillCreateRequestDTO;
import sharumaki.h.f.rent_system.bill_generator.dto.BillUpdateRequestDTO;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.service.BillGeneratorService;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillGeneratorController {
    BillGeneratorService billGeneratorService;

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = billGeneratorService.getAll();
        return ResponseEntity.ok(bills);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBill(@PathVariable String id) {
        return ResponseEntity.ok(billGeneratorService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createBill(@RequestBody BillCreateRequestDTO data) {

        Bill billCreated = billGeneratorService.createBill(data.getRentId(),data.getDays());

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billCreated)
                .message("Bill created")
                .build();

        return ResponseEntity.created(URI.create("/bills/" + billCreated.getId()))
                .body(apiResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateBill(@PathVariable String id,
                                        @RequestBody BillUpdateRequestDTO billUpdateRequestDTO) {

        Bill billToUpdate = new Bill(billUpdateRequestDTO.getAmount(),billUpdateRequestDTO.getDueDate(),null);
        billToUpdate.setId(id);

        Bill billUpdated = billGeneratorService.update(billToUpdate);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billUpdated)
                .message("Bill updated")
                .build();


        return ResponseEntity.ok(apiResponse);
    }
}
