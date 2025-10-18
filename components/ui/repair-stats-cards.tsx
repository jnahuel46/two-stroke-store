"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepairStats } from "@/app/services/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

interface RepairStats {
  pendiente: number;
  completado: number;
  "en progreso": number;
}

export function RepairStatsCards() {
  const { data: stats, isLoading } = useQuery<RepairStats>({
    queryKey: ["repair-stats"],
    queryFn: getRepairStats,
  });

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-48 h-24 animate-pulse">
            <CardContent className="p-3">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Pendiente",
      value: stats?.pendiente || 0,
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "En Progreso",
      value: stats?.["en progreso"] || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Completado",
      value: stats?.completado || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  return (
    <div className="flex gap-6">
      {statsData.map((stat) => (
        <Card key={stat.title} className={`w-48 ${stat.bgColor}`}>
          <CardHeader className="pb-3 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}