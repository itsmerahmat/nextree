import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLinks } from "@/actions/link";
import { LinkModalForm } from "@/components/link/modal-form";

export default async function UsersPage() {
  const userLink = await getLinks();
  return (
    <div className="mx-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-start">
              <h1 className="text-xl">Link</h1>
              <LinkModalForm />
            </div>
          </CardTitle>
          <CardDescription>
            <p className="-mt-2">Manage your user links here</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={userLink} />
        </CardContent>
      </Card>
    </div>
  );
}
