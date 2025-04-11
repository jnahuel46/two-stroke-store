"use client";

import { useState } from "react";
import { getRepairsbyDate } from "@/app/services/repairs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { RepairsTableOver } from "./RepairsTableOver";
import { Calendar } from "@/components/ui/calendar";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { RepairDetail } from "@/types/types";

interface RepairWithDate {
  id: number;
  type: string;
  status: string;
  budget: string;
  description: string;
  clientId: number;
  threshold_date: string;
  userId: number;
  parsedDate: Date;
  client: {
    id: number;
    name: string;
    phone: string;
    email: string;
    userId: number;
  };
}

export const ScheduleRepairs = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Calcular las fechas de inicio y fin del mes
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const { data: repairs = [], isLoading, error, refetch } = useQuery({
    queryKey: ["repairs-by", startDate.toISOString(), endDate.toISOString()],
    queryFn: () => getRepairsbyDate(startDate, endDate),
  });

  // Convertir las fechas de string DD/MM/YYYY a objetos Date
  const repairsWithDates = repairs.map((repair: RepairDetail) => ({
    ...repair,
    parsedDate: parse(repair.threshold_date || '', 'dd/MM/yyyy', new Date())
  })) as RepairWithDate[];

  // Filtrar reparaciones para el mes seleccionado
  const filteredRepairs = repairsWithDates.filter((repair: RepairWithDate) => {
    return (
      repair.parsedDate.getMonth() === date.getMonth() &&
      repair.parsedDate.getFullYear() === date.getFullYear()
    );
  });

  // Obtener las fechas que tienen reparaciones para el mes actual
  const datesWithRepairs = repairsWithDates.reduce((dates: Date[], repair: RepairWithDate) => {
    if (
      repair.parsedDate.getMonth() === date.getMonth() &&
      repair.parsedDate.getFullYear() === date.getFullYear()
    ) {
      dates.push(repair.parsedDate);
    }
    return dates;
  }, []);

  const handleMonthChange = (newDate: Date) => {
    setCurrentMonth(newDate); // Actualizar el título inmediatamente
    setDate(newDate);
    setSelectedDate(undefined);
    refetch(); // Recargar los datos
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
      setDate(newDate);
    }
  };

  if (error) return <p>Error</p>;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Calendario de Reparaciones - {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          <p className="text-muted-foreground">
            {filteredRepairs.length} reparaciones programadas
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-auto border rounded-lg p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            className="rounded-md"
            modifiers={{
              hasRepair: datesWithRepairs,
            }}
            modifiersStyles={{
              hasRepair: {
                backgroundColor: 'hsl(var(--destructive))',
                color: 'hsl(var(--destructive-foreground))',
                opacity: 0.8,
              },
            }}
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              today: "bg-accent text-accent-foreground",
            }}
            locale={es}
          />
        </div>

        <div className="flex-1">
          {isLoading ? (
            <Skeleton className="w-full h-[200px]" />
          ) : filteredRepairs.length === 0 ? (
            <Badge>No hay revisiones para este mes</Badge>
          ) : (
            <>
              <Badge variant="destructive" className="mb-4">
                {filteredRepairs.length} revisiones este mes
              </Badge>
              <RepairsTableOver
                repairs={filteredRepairs}
                title={`Revisiones para ${format(date, 'MMMM yyyy', { locale: es })}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
