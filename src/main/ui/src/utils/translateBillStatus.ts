
export const translateBillStatus = (status: string) => {
  switch (status) {
    case "PAID":
      return "Pagado✅";
    case "UNPAID":
      return "No pagado⏱";
    case "CANCELLED":
      return "Cancelado❌";
    case "REFUNDED":
      return "Reembolsado♻";
    default:
      throw new Error("Estado de factura desconocido");
  }
};