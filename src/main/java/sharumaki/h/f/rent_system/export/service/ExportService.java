package sharumaki.h.f.rent_system.export.service;

import org.springframework.stereotype.Service;
import sharumaki.h.f.rent_system.bill_generator.model.Bill;
import sharumaki.h.f.rent_system.bill_generator.service.BillGeneratorService;
import sharumaki.h.f.rent_system.export.csv.CsvContentGenerator;
import sharumaki.h.f.rent_system.export.exceptions.CsvException;
import sharumaki.h.f.rent_system.export.model.BillRow;

import java.io.IOException;
import java.util.List;

@Service
public class ExportService {

    CsvContentGenerator csvContentGenerator;

    BillGeneratorService billGeneratorService;

    public ExportService(CsvContentGenerator csvContentGenerator, BillGeneratorService billGeneratorService) {
        this.csvContentGenerator = csvContentGenerator;
        this.billGeneratorService = billGeneratorService;
    }

    public byte[] exportCsv() {

        List<Bill> bills = billGeneratorService.getAll();

        List<BillRow> billRows = bills.stream().map(BillRow::new).toList();

        byte[] bytes;

        try{
            bytes = csvContentGenerator.generateCsv(billRows);
        } catch (IOException e) {
            throw new CsvException("Error generating CSV file");
        }

        return bytes;
    }
}
