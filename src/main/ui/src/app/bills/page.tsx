import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { DataTable } from "./data-table";
import { rentSystemImages } from "@/utils/imagesPaths";
import { columns } from "./columns";
import { IBill } from "@/interfaces/rent-system-api";

function getData(): Array<IBill> {
  return [
    {
      id: "1",
      amount: 1200,
      issueDate: new Date("2024-01-10T00:00:00Z"),
      dueDate: new Date("2024-02-10T00:00:00Z"),
      tenant: {
        id: "t1",
        firstname: "Juan",
        lastname: "Pérez",
        dni: "12345678X",
        contactNumber: "+34123456789"
      },
      billRentInfo: {
        id: "r1",
        rentName: "Alquiler Enero"
      },
      paidDate: new Date("2024-01-15T00:00:00Z"),
      status: "PAID"
    },
    {
      id: "2",
      amount: 1500,
      issueDate: new Date("2024-02-10T00:00:00Z"),
      dueDate: new Date("2024-03-10T00:00:00Z"),
      tenant: {
        id: "t2",
        firstname: "María",
        lastname: "García",
        dni: "87654321Y",
        contactNumber: "+34987654321"
      },
      billRentInfo: {
        id: "r2",
        rentName: "Alquiler Febrero"
      },
      paidDate: new Date("2024-01-15T00:00:00Z"),
      status: "UNPAID"
    },
    {
      id: "3",
      amount: 1300,
      issueDate: new Date("2024-03-10T00:00:00Z"),
      dueDate: new Date("2024-04-10T00:00:00Z"),
      tenant: {
        id: "t3",
        firstname: "Pedro",
        lastname: "López",
        dni: "23456789Z",
        contactNumber: "+34234567890"
      },
      billRentInfo: {
        id: "r3",
        rentName: "Alquiler Marzo"
      },
      paidDate: new Date("2024-01-15T00:00:00Z"),
      status: "REFUNDED"
    }
  ]
}

export default function Bill() {

  return (
    <main className='min-h-screen'>
      <Title title='Facturas' backgroundImage={rentSystemImages.tax} />
      <div className='my-4 flex flex-col items-center'>
      </div>
      <DataTable columns={columns} data={getData()} />
    </main>
  )
}