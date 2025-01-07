import { UserForm } from "@/components/user/user-form";

export default async function UserFormPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;
  return (
    <div className="flex justify-center items-center h-screen">
      <UserForm id={id} />
    </div>
  );
}
