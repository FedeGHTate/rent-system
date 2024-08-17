"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBill, IBillRentInfo, ITenant } from "@/interfaces/rent-system-api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const formatDateToDDMMYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

const translateBillStatus = (status: string) => {
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

export const columns: ColumnDef<IBill>[] = [
  {
    accessorKey: "billRentInfo.rentName",
    id: "rentName",
    header: "Alquiler",
  },
  {

    accessorFn: row => `${row.tenant.firstname} ${row.tenant.lastname}`,
    id: "tenant",
    header: "Inquilino",
  },
  {
    accessorKey: "amount",
    header: "Precio",
    accessorFn: row => `${row.amount} $`,
  },
  {
    accessorKey: "issueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de emision
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>("issueDate");

      return <>{formatDateToDDMMYY(date)}</>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado de pago",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return <>{translateBillStatus(status)}</>;
    },
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      const bill: IBill = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Factura</DialogTitle>
              <DialogDescription>
                Datos importantes sobre la factura
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenantName" className="text-right">
                  Inquilino
                </Label>
                <Input
                  id="tenantName"
                  disabled
                  defaultValue={`${bill.tenant.firstname} ${bill.tenant.lastname}`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rentName" className="text-right">
                  Alquiler
                </Label>
                <Input
                  id="rentName"
                  disabled
                  defaultValue={bill.billRentInfo.rentName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio
                </Label>
                <Input
                  id="price"
                  disabled
                  defaultValue={`${bill.amount} $`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issueDate" className="text-right">
                  Fecha de emision
                </Label>
                <Input
                  id="issueDate"
                  disabled
                  defaultValue={formatDateToDDMMYY(bill.issueDate)}
                  className="col-span-3"
                />
              </div>
              {bill.status == "PAID" ? (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paidDate" className="text-right">
                    Fecha de pago
                  </Label>
                  <Input
                    id="paidDate"
                    disabled
                    defaultValue={formatDateToDDMMYY(bill.paidDate)}
                    className="col-span-3"
                  />
                </div>
              ) : bill.status == "CANCELLED" || bill.status == "REFUNDED" ? (
                <></>
              ) : (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Fecha de vencimiento
                  </Label>
                  <Input
                    id="dueDate"
                    disabled
                    defaultValue={formatDateToDDMMYY(bill.dueDate)}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado de la factura
                </Label>
                <Input
                  id="status"
                  disabled
                  defaultValue={translateBillStatus(bill.status)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {bill.status == "PAID" ? (
                <Button type="submit" className="bg-yellow-600" >Reembolsar factura</Button>
              ) : bill.status == "UNPAID" ? (
                <Button type="submit" variant="destructive">Cancelar factura</Button>
              ) : (
                <></>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
