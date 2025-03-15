"use client";

import { useQuery } from "@tanstack/react-query";
import { RepairsTable } from "./sections/RepairsTable";
import { getRepairs } from "@/app/services/repairs";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepairsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["repairs"],
    queryFn: getRepairs,
  });
  if (isLoading) return <Skeleton  className="w-full h-[200px]"/>;
  if (error) return <p>Error</p>;
  return (
    <div className="mt-12">
      <RepairsTable repairs={data} />
    </div>
  );
}
