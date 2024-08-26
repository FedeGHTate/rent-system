import { Button } from "@/components/ui/button";
import { getCsvFetcher } from "@/utils/fetchers";
import { rentSystemPaths } from "@/utils/path";

export const ExportButton = () => {
  const handleExport = async () => {
    try {

      const response = await getCsvFetcher(rentSystemPaths.export.csv);

      // Obtiene el archivo como Blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'export.txt'); // Nombre del archivo a descargar

      // Simula un clic en el enlace para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Limpia el enlace temporal
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV file:', error);
    }
  };

  return (
    <Button onClick={handleExport}>
      Exportar facturas
    </Button>
  );
};