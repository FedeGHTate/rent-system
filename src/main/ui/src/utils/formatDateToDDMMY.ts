export const formatDateToDDMMYY = (dateReceived: Date) => {

  const date = new Date(dateReceived)
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};
