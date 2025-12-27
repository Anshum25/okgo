import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Search, Wrench } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  department: string;
  assignedEmployee: string;
  maintenanceTeam: string;
  location: string;
  status: "active" | "scrapped";
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Hydraulic Pump #3",
    serialNumber: "HPM-2023-001",
    department: "Production",
    assignedEmployee: "John Smith",
    maintenanceTeam: "Hydraulics",
    location: "Floor A, Zone 3",
    status: "active",
  },
  {
    id: "2",
    name: "Conveyor Belt B2",
    serialNumber: "CB-2023-045",
    department: "Logistics",
    assignedEmployee: "Mike Johnson",
    maintenanceTeam: "Mechanical",
    location: "Warehouse 1",
    status: "active",
  },
  {
    id: "3",
    name: "Main Motor Unit",
    serialNumber: "MMU-2022-089",
    department: "Production",
    assignedEmployee: "Sarah Davis",
    maintenanceTeam: "Electrical",
    location: "Floor B, Zone 1",
    status: "active",
  },
  {
    id: "4",
    name: "Hydraulic Press #1",
    serialNumber: "HP-2023-012",
    department: "Manufacturing",
    assignedEmployee: "Robert Brown",
    maintenanceTeam: "Hydraulics",
    location: "Floor A, Zone 1",
    status: "active",
  },
  {
    id: "5",
    name: "Air Filter System",
    serialNumber: "AFS-2023-067",
    department: "Production",
    assignedEmployee: "Emily Wilson",
    maintenanceTeam: "Controls",
    location: "Floor C, Zone 2",
    status: "active",
  },
  {
    id: "6",
    name: "Control Panel #1",
    serialNumber: "CP-2022-034",
    department: "Manufacturing",
    assignedEmployee: "John Smith",
    maintenanceTeam: "Electrical",
    location: "Floor B, Zone 3",
    status: "active",
  },
  {
    id: "7",
    name: "Spindle Motor",
    serialNumber: "SM-2023-156",
    department: "Production",
    assignedEmployee: "Mike Johnson",
    maintenanceTeam: "Electrical",
    location: "Floor A, Zone 2",
    status: "active",
  },
  {
    id: "8",
    name: "Hoist System A",
    serialNumber: "HS-2022-078",
    department: "Logistics",
    assignedEmployee: "Sarah Davis",
    maintenanceTeam: "Mechanical",
    location: "Warehouse 2",
    status: "active",
  },
  {
    id: "9",
    name: "Pump Assembly #2",
    serialNumber: "PA-2023-023",
    department: "Manufacturing",
    assignedEmployee: "Robert Brown",
    maintenanceTeam: "Hydraulics",
    location: "Floor C, Zone 1",
    status: "active",
  },
  {
    id: "10",
    name: "Legacy Motor #5",
    serialNumber: "LM-2020-091",
    department: "Production",
    assignedEmployee: "Emily Wilson",
    maintenanceTeam: "Electrical",
    location: "Storage",
    status: "scrapped",
  },
];

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<"none" | "department" | "employee">(
    "none",
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "scrapped"
  >("active");

  // Get unique values for filters
  const departments = useMemo(
    () => [...new Set(mockEquipment.map((e) => e.department))],
    [],
  );
  const teams = useMemo(
    () => [...new Set(mockEquipment.map((e) => e.maintenanceTeam))],
    [],
  );

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return mockEquipment.filter((equipment) => {
      const matchSearch =
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.serialNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        equipment.assignedEmployee
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchDepartment =
        !selectedDepartment || equipment.department === selectedDepartment;
      const matchTeam =
        !selectedTeam || equipment.maintenanceTeam === selectedTeam;
      const matchStatus =
        statusFilter === "all" || equipment.status === statusFilter;

      return matchSearch && matchDepartment && matchTeam && matchStatus;
    });
  }, [searchTerm, selectedDepartment, selectedTeam, statusFilter]);

  // Group equipment
  const groupedEquipment = useMemo(() => {
    if (groupBy === "none") {
      return [{ key: "all", label: "All Equipment", items: filteredEquipment }];
    }

    const groups: { [key: string]: Equipment[] } = {};

    filteredEquipment.forEach((equipment) => {
      const groupKey =
        groupBy === "department"
          ? equipment.department
          : equipment.assignedEmployee;

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(equipment);
    });

    return Object.entries(groups).map(([key, items]) => ({
      key,
      label: key,
      items,
    }));
  }, [filteredEquipment, groupBy]);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Equipment</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your equipment inventory and assets (
              {filteredEquipment.length} items)
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Equipment
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search equipment by name, serial number, or employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Status
                </label>
                <Select
                  value={statusFilter}
                  onValueChange={(value: any) => setStatusFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scrapped">Scrapped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Department
                </label>
                <Select
                  value={selectedDepartment || "all"}
                  onValueChange={(value) =>
                    setSelectedDepartment(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Maintenance Team
                </label>
                <Select
                  value={selectedTeam || "all"}
                  onValueChange={(value) =>
                    setSelectedTeam(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Group By
                </label>
                <Select
                  value={groupBy}
                  onValueChange={(value: any) => setGroupBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="employee">Assigned Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Tables */}
        <div className="space-y-6">
          {groupedEquipment.map((group) => (
            <div key={group.key}>
              {groupBy !== "none" && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    {group.label}
                    <span className="ml-auto text-sm font-normal text-muted-foreground">
                      {group.items.length} item
                      {group.items.length !== 1 ? "s" : ""}
                    </span>
                  </h3>
                </div>
              )}

              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary hover:bg-secondary">
                        <TableHead className="font-semibold">
                          Equipment Name
                        </TableHead>
                        <TableHead className="font-semibold">
                          Serial Number
                        </TableHead>
                        <TableHead className="font-semibold">
                          Department
                        </TableHead>
                        <TableHead className="font-semibold">
                          Assigned Employee
                        </TableHead>
                        <TableHead className="font-semibold">
                          Maintenance Team
                        </TableHead>
                        <TableHead className="font-semibold">
                          Location
                        </TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="text-right font-semibold">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.items.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No equipment found matching your filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        group.items.map((equipment) => (
                          <TableRow
                            key={equipment.id}
                            className="hover:bg-secondary/50"
                          >
                            <TableCell className="font-medium text-foreground">
                              {equipment.name}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {equipment.serialNumber}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {equipment.department}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {equipment.assignedEmployee}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {equipment.maintenanceTeam}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {equipment.location}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                  equipment.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {equipment.status === "active"
                                  ? "Active"
                                  : "Scrapped"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
