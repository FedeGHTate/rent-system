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
import { IBill } from "@/interfaces/rent-system-api";
import { formatDateToDDMMYY } from "@/utils/formatDateToDDMMY";
import { rentSystemPaths } from "@/utils/path";
import { translateBillStatus } from "@/utils/translateBillStatus";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
      const value = row.getValue<string>("issueDate");
      const date : Date = new Date(value);

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
        <Button onClick={
          () => window.location.href = `${rentSystemPaths.bills.details(bill.id)}`
        }>Ver factura</Button>
      );
    },
  },
];

/**
 *         <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ver factura</Button>
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
                <div className="flex flex-row gap-5 justify-center">
                <Button type="submit" variant="destructive" className="bg-green-500">Pagada</Button>
                <Button type="submit" variant="destructive">Cancelar</Button>
                </div>
              ) : (
                <></>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
 */