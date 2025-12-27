import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { KanbanColumn } from "@/components/maintenance/KanbanColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Request {
  id: string;
  subject: string;
  equipment: string;
  technician: string;
  technicianInitial: string;
  scheduledDate?: string;
  isOverdue?: boolean;
  status: "new" | "in-progress" | "repaired" | "scrap";
}

const initialRequests: Request[] = [
  // New
  {
    id: "1",
    subject: "Emergency Pump Repair",
    equipment: "Hydraulic Pump #3",
    technician: "John Smith",
    technicianInitial: "J",
    isOverdue: true,
    status: "new",
  },
  {
    id: "2",
    subject: "Belt Replacement",
    equipment: "Conveyor Belt B2",
    technician: "Mike Johnson",
    technicianInitial: "M",
    scheduledDate: "Dec 28, 2024",
    status: "new",
  },
  {
    id: "3",
    subject: "Motor Inspection",
    equipment: "Main Motor Unit",
    technician: "Sarah Davis",
    technicianInitial: "S",
    scheduledDate: "Dec 29, 2024",
    status: "new",
  },

  // In Progress
  {
    id: "4",
    subject: "Hydraulic Fluid Change",
    equipment: "Hydraulic Press #1",
    technician: "John Smith",
    technicianInitial: "J",
    scheduledDate: "Dec 27, 2024",
    status: "in-progress",
  },
  {
    id: "5",
    subject: "Seal Replacement",
    equipment: "Pump Assembly #2",
    technician: "Mike Johnson",
    technicianInitial: "M",
    status: "in-progress",
  },
  {
    id: "6",
    subject: "Bearing Lubrication",
    equipment: "Spindle Motor",
    technician: "Robert Brown",
    technicianInitial: "R",
    status: "in-progress",
  },
  {
    id: "7",
    subject: "Cable Inspection",
    equipment: "Hoist System A",
    technician: "Emily Wilson",
    technicianInitial: "E",
    status: "in-progress",
  },

  // Repaired
  {
    id: "8",
    subject: "Valve Calibration",
    equipment: "Control Valve #4",
    technician: "John Smith",
    technicianInitial: "J",
    scheduledDate: "Dec 20, 2024",
    status: "repaired",
  },
  {
    id: "9",
    subject: "Filter Replacement",
    equipment: "Air Filter System",
    technician: "Sarah Davis",
    technicianInitial: "S",
    scheduledDate: "Dec 19, 2024",
    status: "repaired",
  },
  {
    id: "10",
    subject: "Electrical Wiring Update",
    equipment: "Control Panel #1",
    technician: "Robert Brown",
    technicianInitial: "R",
    status: "repaired",
  },
  {
    id: "11",
    subject: "Paint Touch-up",
    equipment: "Equipment Housing",
    technician: "Emily Wilson",
    technicianInitial: "E",
    status: "repaired",
  },

  // Scrap
  {
    id: "12",
    subject: "Decommission Old Motor",
    equipment: "Legacy Motor #5",
    technician: "Mike Johnson",
    technicianInitial: "M",
    status: "scrap",
  },
  {
    id: "13",
    subject: "Remove Damaged Bearing",
    equipment: "Spindle Bearing #3",
    technician: "Robert Brown",
    technicianInitial: "R",
    status: "scrap",
  },
];

export default function Maintenance() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();

    if (!draggedCard) return;

    const card = requests.find((r) => r.id === draggedCard);
    if (!card) return;

    setRequests(
      requests.map((r) =>
        r.id === draggedCard
          ? { ...r, status: newStatus as Request["status"] }
          : r,
      ),
    );

    setDraggedCard(null);
  };

  const getCardsByStatus = (status: Request["status"]) => {
    return requests.filter((r) => r.status === status);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Maintenance Requests
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage and track maintenance work across your equipment
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          <KanbanColumn
            title="New"
            status="new"
            cards={getCardsByStatus("new")}
            cardCount={getCardsByStatus("new").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
          />

          <KanbanColumn
            title="In Progress"
            status="in-progress"
            cards={getCardsByStatus("in-progress")}
            cardCount={getCardsByStatus("in-progress").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
          />

          <KanbanColumn
            title="Repaired"
            status="repaired"
            cards={getCardsByStatus("repaired")}
            cardCount={getCardsByStatus("repaired").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
          />

          <KanbanColumn
            title="Scrap"
            status="scrap"
            cards={getCardsByStatus("scrap")}
            cardCount={getCardsByStatus("scrap").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
          />
        </div>
      </div>
    </MainLayout>
  );
}
