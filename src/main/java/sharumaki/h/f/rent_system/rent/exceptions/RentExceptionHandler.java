package sharumaki.h.f.rent_system.rent.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import sharumaki.h.f.rent_system.bill_generator.exceptions.BillRefundUnpaidException;
import sharumaki.h.f.rent_system.bill_generator.exceptions.MissingTenantException;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

@ControllerAdvice(basePackages = "sharumaki.h.f.rent_system.rent")
public class RentExceptionHandler {
    @ExceptionHandler(RentHasATenantException.class)
    public ResponseEntity<ApiResponse<Object>> rentHasATenantException(RentHasATenantException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(RentIsUnavailableException.class)
    public ResponseEntity<ApiResponse<Object>> rentIsUnavailableException(RentIsUnavailableException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(RentNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> rentNotFoundException(RentNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
}
