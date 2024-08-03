package sharumaki.h.f.rent_system.bill_generator.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import sharumaki.h.f.rent_system.common.reponse.ApiResponse;

@ControllerAdvice(basePackages = "sharumaki.h.f.rent_system.bill_generator")
public class ExceptionBillGeneratorHandler {

    @ExceptionHandler(BillCancelledException.class)
    public ResponseEntity<ApiResponse<Object>> billCancelledException(BillCancelledException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(BillNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> billNotFound(BillNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(BillPaidException.class)
    public ResponseEntity<ApiResponse<Object>> billPaidException(BillPaidException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(BillRefundedException.class)
    public ResponseEntity<ApiResponse<Object>> billRefundedException(BillRefundedException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(InvalidBillPeriodException.class)
    public ResponseEntity<ApiResponse<Object>> invalidBillPeriodException(InvalidBillPeriodException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(MissingTenantException.class)
    public ResponseEntity<ApiResponse<Object>> missingTenantException(MissingTenantException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(BillRefundUnpaidException.class)
    public ResponseEntity<ApiResponse<Object>> billRefundUnpaidException(BillRefundUnpaidException e) {

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .value(e.getMessage())
                .message("Error")
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }


}
