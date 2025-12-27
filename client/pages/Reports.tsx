import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const teamRequestsData = [
  { name: "Electrical", value: 34 },
  { name: "Mechanical", value: 28 },
  { name: "Hydraulics", value: 22 },
  { name: "Controls", value: 16 },
];

const equipmentCategoryData = [
  { name: "Motors", value: 32, color: "#7c3aed" },
  { name: "Pumps", value: 28, color: "#3b82f6" },
  { name: "Conveyors", value: 18, color: "#22c55e" },
  { name: "Controls", value: 22, color: "#f59e0b" },
];

const maintenanceTypeData = [
  { name: "Corrective", value: 58, color: "#ef4444" },
  { name: "Preventive", value: 62, color: "#22c55e" },
];

const costByTeamData = [
  { name: "Electrical", value: 12400 },
  { name: "Mechanical", value: 18600 },
  { name: "Hydraulics", value: 14200 },
  { name: "Controls", value: 8900 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const stats = [
    {
      label: "Total Requests",
      value: "120",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Avg Response Time",
      value: "2.4h",
      change: "-8%",
      trend: "down",
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      label: "Completion Rate",
      value: "94%",
      change: "+3%",
      trend: "up",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Overdue Tasks",
      value: "3",
      change: "-50%",
      trend: "down",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="mt-1 text-muted-foreground">
              Analytics and insights on your maintenance operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="border-0 shadow-sm overflow-hidden">
                <div className={stat.bgColor + " p-6"}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp
                          className={`h-3 w-3 ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={stat.bgColor + " rounded-lg p-3"}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Requests by Team */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Requests by Team
            </h3>
            <SimpleBarChart data={teamRequestsData} height={300} />
          </Card>

          {/* Equipment Category Distribution */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Equipment Category Distribution
            </h3>
            <div className="flex justify-center">
              <SimplePieChart data={equipmentCategoryData} size={280} />
            </div>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Maintenance Type */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Maintenance Type Breakdown
            </h3>
            <div className="flex justify-center">
              <SimplePieChart data={maintenanceTypeData} size={280} />
            </div>
          </Card>

          {/* Cost by Team */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Cost by Team (in USD)
            </h3>
            <SimpleBarChart data={costByTeamData} height={300} />
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Team Performance */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Team Performance
            </h3>
            <div className="space-y-4">
              {[
                { name: "Electrical", score: 92, color: "bg-blue-500" },
                { name: "Mechanical", score: 88, color: "bg-green-500" },
                { name: "Hydraulics", score: 85, color: "bg-orange-500" },
                { name: "Controls", score: 94, color: "bg-purple-500" },
              ].map((team) => (
                <div key={team.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {team.name}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {team.score}%
                    </p>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${team.color} h-2 rounded-full`}
                      style={{ width: `${team.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Equipment Status */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Equipment Status
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Operational",
                  value: 142,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "Maintenance",
                  value: 8,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "Repair",
                  value: 3,
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
                {
                  label: "Scrapped",
                  value: 2,
                  color: "text-red-600",
                  bg: "bg-red-50",
                },
              ].map((status) => (
                <div
                  key={status.label}
                  className={`flex items-center justify-between p-3 rounded-lg ${status.bg}`}
                >
                  <p className="text-sm font-medium text-foreground">
                    {status.label}
                  </p>
                  <p className={`text-lg font-bold ${status.color}`}>
                    {status.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Maintenance Schedule */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Upcoming Maintenance
            </h3>
            <div className="space-y-3">
              {[
                { task: "Pump Maintenance", date: "Dec 28", icon: "🔧" },
                { task: "Motor Inspection", date: "Dec 29", icon: "⚙️" },
                { task: "Belt Replacement", date: "Jan 2", icon: "🔌" },
                { task: "Filter Check", date: "Jan 5", icon: "💨" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-sm font-medium text-foreground">
                      {item.task}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className="border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Report Summary
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Maintenance Hours
              </p>
              <p className="text-2xl font-bold text-foreground">248.5 hrs</p>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last period
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-foreground">$54,100</p>
              <p className="text-xs text-muted-foreground mt-1">
                -5% from last period
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Equipment Uptime
              </p>
              <p className="text-2xl font-bold text-foreground">98.7%</p>
              <p className="text-xs text-muted-foreground mt-1">
                +0.2% from last period
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Preventive vs Corrective
              </p>
              <p className="text-2xl font-bold text-foreground">52% / 48%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Optimal balance maintained
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
