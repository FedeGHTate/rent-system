package sharumaki.h.f.rent_system.tenant.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

@ControllerAdvice(basePackages = "sharumaki.h.f.rent_system.tenant")
public class TenantExceptionHandler {
    @ExceptionHandler(TenantNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> tenantNotFoundException(TenantNotFoundException e) {

        return ResponseEntity.notFound().build();
    }
}
