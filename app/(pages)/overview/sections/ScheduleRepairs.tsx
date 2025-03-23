"use client";

import { getRepairsbyDate } from "@/app/services/repairs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { RepairsTableOver } from "./RepairsTableOver";

export const ScheduleRepairs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["repairs-by"],
    queryFn: getRepairsbyDate,
  });

  if (isLoading) return <Skeleton className="w-full h-[200px]" />;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <div className="w-full">
      {data.length === 0 ? (
        <Badge className="ml-4">No tienes revisiones</Badge>
      ) : (
        <>
          {" "}
          <Badge className="ml-4" variant="destructive">
            Tienes revisiones pendientes
          </Badge>
          <RepairsTableOver
            repairs={data}
            title="Revisiones Pendientes para hoy"
          />
        </>
      )}
    </div>
  );
};
