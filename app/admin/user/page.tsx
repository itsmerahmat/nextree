import { DataTable } from "@/components/datatable/data-table";
import { getUsers } from "@/actions/user";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserModalForm } from "@/components/user/modal-form";
import { verifySession } from "@/lib/session";

export default async function UsersPage() {
  const users = await getUsers();
  const session = await verifySession();
  const userRole = session?.user?.role;
  return (
    <div className="mx-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-start">
              <h1 className="text-xl">User</h1>
              {userRole === "ADMIN" && <UserModalForm />}
            </div>
          </CardTitle>
          <CardDescription>
            <p className="-mt-2">Manage your users here</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
