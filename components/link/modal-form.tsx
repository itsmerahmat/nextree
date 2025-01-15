"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLink, CreateLinkInput, updateLink } from "@/actions/link";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Link, User } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { getUsers } from "@/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const createSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  userId: z.coerce.number({
    required_error: "User Id is required.",
  }),
  isActive: z.boolean().default(true),
});

interface LinkFormProps {
  data?: Link;
  type?: "Create" | "Edit";
}

export function LinkModalForm({ data, type = "Create" }: LinkFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data: User[]) => setUsers(data));
  }, []);

  const schema = createSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.title ?? "",
      url: data?.url ?? "",
      userId: data?.userId ?? 0,
      isActive: data?.isActive ?? true,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    if (type === "Create") {
      const result = await createLink(values as CreateLinkInput);
      if (result) {
        toast({
          title: "Link created",
          description: `Link ${result.title} has been created successfully.`,
        });
      }
    } else if (type === "Edit" && data) {
      const result = await updateLink({ ...values, id: data.id });
      if (result) {
        toast({
          title: "Link updated",
          description: `Link ${result.title} has been updated successfully.`,
        });
      }
    }
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={type === "Create" ? "default" : "sm"}>
          {type === "Create" ? "Create Link" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "Create" ? "Create Link" : "Edit Link"}
          </DialogTitle>
          <DialogDescription>
            {type === "Create"
              ? "Fill in the form below to create a new link."
              : "Edit the form below to update the link."}{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{field.value ? "Active" : "Inactive"}</FormLabel>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {type === "Create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
