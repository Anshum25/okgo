import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  Package,
  AlertCircle,
  Wrench,
  CheckCircle,
  BarChart3,
} from "lucide-react";

// Sample data
const requestsByTeamData = [
  { name: "Electrical", value: 24 },
  { name: "Mechanical", value: 18 },
  { name: "Hydraulics", value: 12 },
  { name: "Controls", value: 8 },
];

const requestsByStatusData = [
  { name: "New", value: 14, color: "#999999" },
  { name: "In Progress", value: 22, color: "#3b82f6" },
  { name: "Repaired", value: 28, color: "#22c55e" },
  { name: "Scrap", value: 6, color: "#ef4444" },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your maintenance operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Total Equipment"
            value="156"
            icon={Package}
            bgColor="bg-indigo-50"
            iconColor="text-indigo-600"
            description="Active assets"
          />
          <KPICard
            label="Open Requests"
            value="22"
            icon={Wrench}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
            trend="up"
            trendValue={12}
          />
          <KPICard
            label="Overdue Requests"
            value="3"
            icon={AlertCircle}
            bgColor="bg-red-50"
            iconColor="text-red-600"
            description="Requires attention"
          />
          <KPICard
            label="Preventive Scheduled"
            value="8"
            icon={CheckCircle}
            bgColor="bg-green-50"
            iconColor="text-green-600"
            description="Next 7 days"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Requests by Team */}
          <Card className="border-0 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Requests by Team
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsByTeamData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Requests by Status */}
          <Card className="border-0 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Requests by Status
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestsByStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestsByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h2>
          <div className="space-y-3">
            {[
              {
                title: "Pump Maintenance",
                equipment: "Hydraulic Pump #3",
                status: "In Progress",
                time: "2 hours ago",
              },
              {
                title: "Filter Replacement",
                equipment: "Air Filter System",
                status: "Repaired",
                time: "5 hours ago",
              },
              {
                title: "Emergency Repair",
                equipment: "Motor Unit #2",
                status: "New",
                time: "1 day ago",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.equipment}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      activity.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : activity.status === "Repaired"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
