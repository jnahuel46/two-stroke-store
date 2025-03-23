import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Repair } from "@/types/types";

interface RepairsTableProps {
  repairs: Repair[];
}

export function RepairsTable({ repairs }: RepairsTableProps) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tabla de Arreglos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Arreglo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha De Entrega</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{repair.type}</TableCell>
              <TableCell>{repair.status}</TableCell>
              <TableCell>{repair.budget}</TableCell>
              <TableCell>{repair.description}</TableCell>
              <TableCell>{repair.client.name}</TableCell>
              <TableCell>{repair.threshold_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
