package sharumaki.h.f.rent_system.bill_generator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharumaki.h.f.rent_system.bill_generator.dto.BillCreateRequestDTO;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.service.BillGeneratorService;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "*")
public class BillGeneratorController {
    BillGeneratorService billGeneratorService;

    public BillGeneratorController(BillGeneratorService billGeneratorService) {
        this.billGeneratorService = billGeneratorService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllBills() {
        List<Bill> bills = billGeneratorService.getAll();

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(bills)
                .message("Bills found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getBill(@PathVariable String id) {

        Bill bill = billGeneratorService.getById(id);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(bill)
                .message("Bill found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createBill(@RequestBody BillCreateRequestDTO data) {

        Bill billCreated = billGeneratorService.createBill(data.getRentId(),data.getDays(),data.isWithRecharges());

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billCreated)
                .message("Bill created")
                .build();

        return ResponseEntity.created(URI.create("/bills/" + billCreated.getId()))
                .body(apiResponse);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<ApiResponse<Object>> pay(@PathVariable String id) {
        Bill billPaid = billGeneratorService.pay(id);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billPaid)
                .message("Bill paid")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Object>> cancel(@PathVariable String id) {
        Bill billPaid = billGeneratorService.cancel(id);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billPaid)
                .message("Bill cancelled")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<ApiResponse<Object>> refund(@PathVariable String id) {
        Bill billPaid = billGeneratorService.refund(id);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(billPaid)
                .message("Bill refunded")
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
