import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/actions/user";
import { User2Icon } from "lucide-react";
import Link from "next/link";

const UserPage = async () => {
  const users = await getUsers();
  return (
    <div className="mx-5 lg:mx-10">
      <div className="my-5 flex justify-between">
        <h1 className="text-3xl font-semibold">Users</h1>
        <Link href="/user/form">
          <Button>Create User</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <User2Icon />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Username: {user.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Role: {user.role}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Created At: {new Date(user.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Updated At: {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
