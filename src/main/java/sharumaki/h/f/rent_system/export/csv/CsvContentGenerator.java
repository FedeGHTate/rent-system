package sharumaki.h.f.rent_system.export.csv;

import sharumaki.h.f.rent_system.export.model.BillRow;

import java.io.IOException;
import java.util.List;

public interface CsvContentGenerator {
    byte[] generateCsv(List<BillRow> rows) throws IOException;
}
