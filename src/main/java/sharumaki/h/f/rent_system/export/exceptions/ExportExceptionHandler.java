package sharumaki.h.f.rent_system.export.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice(basePackages = "sharumaki.h.f.rent_system.export")
public class ExportExceptionHandler {
    @ExceptionHandler(CsvException.class)
    public ResponseEntity errorCreationTheCsv(CsvException e) {

        return ResponseEntity.internalServerError().build();
    }
}
