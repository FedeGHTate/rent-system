package sharumaki.h.f.rent_system.tenant.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;
import sharumaki.h.f.rent_system.tenant.dto.TenantRequestDTO;
import sharumaki.h.f.rent_system.tenant.model.Tenant;
import sharumaki.h.f.rent_system.tenant.services.TenantService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tenants")
@CrossOrigin(origins = "http://localhost:3000")
public class TenantController {

    TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<Object>> getAll() {
        List<Tenant> tenants = this.tenantService.getAll();

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(tenants)
                .message("Tenants found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getById(@PathVariable String id) {
        Tenant aTenant = this.tenantService.getById(id);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(aTenant)
                .message("Tenant found")
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<Object>> create(@RequestBody TenantRequestDTO tenantRequestDTO) {
        Tenant tenantToCreate = Tenant.builder()
                .firstname(tenantRequestDTO.getFirstname())
                .lastname(tenantRequestDTO.getLastname())
                .dni(tenantRequestDTO.getDni())
                .contactNumber(tenantRequestDTO.getContactNumber())
                .build();

        Tenant tenantCreated = tenantService.createTenant(tenantToCreate);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(tenantCreated)
                .message("Tenant created")
                .build();

        return ResponseEntity.created(URI.create("/tenants/" + tenantCreated.getId())).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        this.tenantService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @RequestBody TenantRequestDTO tenant) {

        Tenant tenantToUpdate = Tenant.builder().firstname(tenant.getFirstname())
                .lastname(tenant.getLastname())
                .dni(tenant.getDni())
                .contactNumber(tenant.getContactNumber())
                .build();

        tenantToUpdate.setId(id);

        Tenant tenantUpdated = this.tenantService.update(tenantToUpdate);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(tenantUpdated)
                .message("Tenant updated")
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
}
