export default async function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-secondary">
          <p className="text-sebg-secondary-foreground text-lg flex justify-center items-center h-full">
            Coming Soon
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-secondary">
          <p className="text-sebg-secondary-foreground text-lg flex justify-center items-center h-full">
            Coming Soon
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-secondary">
          <p className="text-sebg-secondary-foreground text-lg flex justify-center items-center h-full">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
