import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSocials } from "@/actions/social";
import { SocialModalForm } from "@/components/social/modal-form";

export default async function UsersPage() {
  const userSocial = await getSocials();
  return (
    <div className="mx-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-start">
              <h1 className="text-xl">Social Media</h1>
              <SocialModalForm />
            </div>
          </CardTitle>
          <CardDescription>
            <p className="-mt-2">Manage your user social medias here</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={userSocial} />
        </CardContent>
      </Card>
    </div>
  );
}
