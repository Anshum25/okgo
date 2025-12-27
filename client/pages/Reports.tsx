import { MainLayout } from "@/components/layout/MainLayout";

export default function Reports() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Analytics and insights on your maintenance operations
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              The Reports view is being developed. Continue prompting to build out this page with detailed analytics, charts, and export functionality.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
