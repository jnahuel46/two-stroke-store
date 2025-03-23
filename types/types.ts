export interface Client {
  id: number;
  name: string;
  phone: string;
  repairs?: Repair[];
  email: string;
}

export interface RepairDetail {
  id?: number;
  type: string;
  status: string;
  budget: string;
  description: string;
  clientId: number;
  threshold_date?: string;
}

export interface Repair {
  id: number;
  type: string;
  status: string;
  budget: string;
  description: string;
  clientId: number;
  client: Client;
  threshold_date?: string;
}
