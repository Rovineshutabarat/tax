"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { InvitationRequest } from "@/types/payload/request/invitation.request";
import { InvitationService } from "@/services/invitation.service";
import { Combobox } from "@/components/shared/combobox";
import { RoleService } from "@/services/role.service";
import { Role } from "@/types/entity/role";

const InviteEmployeePage = () => {
  const form = useForm<InvitationRequest>({
    resolver: zodResolver(InvitationRequest),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      roles: [],
    },
  });

  const sendInvitationMutation = useMutation({
    mutationKey: ["send_invitation"],
    mutationFn: (data: InvitationRequest) =>
      InvitationService.sendInvitation(data),
    onSuccess: () => {
      toast.success("Success sending invitation");
      form.reset();
    },
    onError: () => toast.error("Failed to send invitation"),
  });

  const onSubmit: SubmitHandler<InvitationRequest> = (
    data: InvitationRequest,
  ) => {
    sendInvitationMutation.mutate(data);
  };

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => RoleService.findAllRoles(),
  });

  return (
    <div className="space-y-6 mt-5">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>User Invitation</CardTitle>
              <CardDescription>
                Enter the user information to send an invitation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      The username for the invited user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g. johndoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The email address where the invitation will be sent.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Roles</FormLabel>
                    <Combobox
                      placeholder="Select roles"
                      contents={(roles?.data ?? []).map((role: Role) => ({
                        label: role.name,
                        value: role.name,
                      }))}
                      value={Array.isArray(field.value) ? field.value : []}
                      onValueChange={field.onChange}
                    />
                    <FormDescription>
                      Select one or more roles for the invited user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={sendInvitationMutation.isPending}
              >
                {sendInvitationMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div
                      className="inline-block h-4 w-4 animate-spin rounded-full border-3 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_0.4s_linear_infinite] dark:text-slate-700"
                      role="status"
                    ></div>
                    <p>Please Wait..</p>
                  </div>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default InviteEmployeePage;
