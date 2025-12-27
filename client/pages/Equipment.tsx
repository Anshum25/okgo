import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Equipment() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Equipment</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your equipment inventory and assets
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Equipment
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              The Equipment management view is being developed. Continue prompting to build out this page with features like equipment search, filters, and detailed views.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
