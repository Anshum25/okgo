import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
} from "lucide-react";

interface MaintenanceEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  equipment: string;
  team: string;
  technician: string;
  type: "preventive" | "scheduled";
  color: string;
}

const mockEvents: MaintenanceEvent[] = [
  {
    id: "1",
    date: "2024-12-28",
    title: "Hydraulic Pump Maintenance",
    equipment: "Hydraulic Pump #3",
    team: "Hydraulics",
    technician: "John Smith",
    type: "preventive",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "2",
    date: "2024-12-29",
    title: "Motor Inspection",
    equipment: "Main Motor Unit",
    team: "Electrical",
    technician: "Sarah Davis",
    type: "preventive",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "3",
    date: "2024-12-30",
    title: "Conveyor Belt Check",
    equipment: "Conveyor Belt B2",
    team: "Mechanical",
    technician: "Mike Johnson",
    type: "preventive",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "4",
    date: "2025-01-02",
    title: "Filter Replacement",
    equipment: "Air Filter System",
    team: "Controls",
    technician: "Emily Wilson",
    type: "preventive",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "5",
    date: "2025-01-05",
    title: "Hydraulic Press Servicing",
    equipment: "Hydraulic Press #1",
    team: "Hydraulics",
    technician: "Robert Brown",
    type: "preventive",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "6",
    date: "2025-01-08",
    title: "Control Panel Testing",
    equipment: "Control Panel #1",
    team: "Electrical",
    technician: "John Smith",
    type: "preventive",
    color: "bg-purple-100 text-purple-700",
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get calendar days for the current month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockEvents.filter((e) => e.date === dateStr);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return mockEvents.filter((e) => e.date === selectedDate);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage preventive maintenance schedules
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">{monthName}</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-semibold text-muted-foreground text-sm py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {days.map((day) => {
                  const dayEvents = getEventsForDate(day);
                  const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                      className={`aspect-square rounded-lg border-2 p-2 text-sm transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : dayEvents.length > 0
                            ? "border-border bg-secondary/50 hover:border-primary"
                            : "border-border hover:bg-secondary"
                      }`}
                    >
                      <div className="flex flex-col items-start h-full">
                        <span className="font-semibold text-foreground">{day}</span>
                        {dayEvents.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full bg-primary"
                              />
                            ))}
                            {dayEvents.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{dayEvents.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Events Sidebar */}
          <div>
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString("default", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a Date"}
              </h3>

              <div className="space-y-3">
                {getEventsForSelectedDate().length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      {selectedDate ? "No maintenance scheduled" : "Click a date to view events"}
                    </p>
                  </div>
                ) : (
                  getEventsForSelectedDate().map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.equipment}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${event.color}`}>
                              {event.team}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                              {event.technician}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedDate && getEventsForSelectedDate().length > 0 && (
                <Button className="w-full mt-6">View Details</Button>
              )}
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Scheduled Maintenance</h3>
          <div className="space-y-3">
            {mockEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-10 rounded-full ${event.color}`} />
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.equipment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {new Date(event.date + "T00:00:00").toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.technician}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
