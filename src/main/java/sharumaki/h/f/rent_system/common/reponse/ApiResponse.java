package sharumaki.h.f.rent_system.common.reponse;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class ApiResponse<T> {
    private String message;
    private T value;
}
