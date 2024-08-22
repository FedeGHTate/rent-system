package sharumaki.h.f.rent_system.service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;
import sharumaki.h.f.rent_system.service.dto.ServiceRequestDTO;
import sharumaki.h.f.rent_system.service.model.Service;
import sharumaki.h.f.rent_system.service.services.ServicesService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    ServicesService servicesService;

    public ServiceController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> create(@RequestBody ServiceRequestDTO serviceRequestDTO) {

        Service serviceToCreate = new Service(serviceRequestDTO.getName(),serviceRequestDTO.getPrice());

        Service createdService = this.servicesService.create(serviceToCreate);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(createdService)
                .message("Service created")
                .build();

        return ResponseEntity.created(URI.create("/services/" + createdService.getId())).body(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAll() {

        List<Service> services = servicesService.getAll();


        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(services)
                .message("Services found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getById(@PathVariable String id) {

        Service service = servicesService.getById(id);


        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(service)
                .message("Service found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> update(@PathVariable String id, @RequestBody Service serviceModified) {

        Service serviceUpdated = servicesService.update(serviceModified);
        serviceUpdated.setId(id);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(serviceUpdated)
                .message("Service updated")
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable String id) {
        servicesService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
