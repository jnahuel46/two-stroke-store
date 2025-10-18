import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Repair } from "@/types/types";
import { useState, useMemo } from "react";

interface RepairsTableProps {
  repairs: Repair[];
  title: string;
}

export function RepairsTableOver({ repairs, title }: RepairsTableProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedRepairs = useMemo(() => {
    return repairs.sort((a, b) => {
      const nameA = a.client.name.toLowerCase();
      const nameB = b.client.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [repairs, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Arreglo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="h-auto p-0 font-medium"
              >
                Cliente
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Fecha De Revision</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRepairs.map((repair) => (
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
