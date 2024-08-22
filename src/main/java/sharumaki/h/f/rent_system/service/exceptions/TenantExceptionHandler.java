package sharumaki.h.f.rent_system.service.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

@ControllerAdvice(basePackages = "sharumaki.h.f.rent_system.service")
public class TenantExceptionHandler {
    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> serviceNotFoundException(ServiceNotFoundException e) {

        return ResponseEntity.notFound().build();
    }
}
