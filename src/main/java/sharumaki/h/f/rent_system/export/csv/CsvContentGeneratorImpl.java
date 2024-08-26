package sharumaki.h.f.rent_system.export.csv;

import org.springframework.stereotype.Component;
import sharumaki.h.f.rent_system.export.model.BillRow;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Component
public class CsvContentGeneratorImpl implements CsvContentGenerator{

    @Override
    public byte[] generateCsv(List<BillRow> rows) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(outputStream);

        //In Spanish
        writer.println("ID,Alquiler,Precio Total,Precio de Alquiler,Adicionales,Fecha de creacion,Fecha de vencimiento,Nombre,Apellido,DNI,Telefono,Fecha de pago,Estado");

        // Escribir filas
        for (BillRow row : rows) {
            writer.printf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s%n",
                    row.getId(),
                    row.getRentName(),
                    row.getAmount(),
                    row.getBasePrice(),
                    row.getServiceCharge(),
                    row.getIssueDate(),
                    row.getDueDate(),
                    row.getTenantFirstname(),
                    row.getTenantLastname(),
                    row.getDni(),
                    row.getContactNumber(),
                    row.getPaidDate(),
                    row.getStatus());
        }

        writer.flush();
        return outputStream.toByteArray();
    }
}
