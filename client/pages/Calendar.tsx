import { MainLayout } from "@/components/layout/MainLayout";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage preventive maintenance schedules
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              The Calendar view is being developed. Continue prompting to build out this page with preventive maintenance scheduling and calendar integration.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
