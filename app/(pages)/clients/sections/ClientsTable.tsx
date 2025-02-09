import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Client } from "@/types/types";

interface ClientTableProps {
  clients: Client[];
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  onRepairClick: (client: Client) => void;
}

export function ClientTable({ clients, selectedClient, setSelectedClient, onRepairClick }: ClientTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Seleccionar</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Arreglos</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>
              <RadioGroup value={selectedClient?.id.toString()} onValueChange={() => setSelectedClient(client)}>
                <RadioGroupItem value={client.id.toString()} id={`client-${client.id}`} />
              </RadioGroup>
            </TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>
              <Button variant="link" onClick={() => onRepairClick(client)}>
                {client.repairs}
              </Button>
            </TableCell>
            <TableCell>{client.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
